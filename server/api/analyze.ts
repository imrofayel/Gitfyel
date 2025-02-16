import { Octokit } from 'octokit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getQuery } from 'h3';

interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  html_url: string;
}

interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const username = query.username as string;

  if (!username) {
    throw createError({
      statusCode: 400,
      message: 'Username is required',
    });
  }

  // Initialize Octokit & Google Generative AI using tokens from runtime config.
  const octokit = new Octokit({
    auth: config.public.githubToken,
  });

  const genAI = new GoogleGenerativeAI(config.public.geminiApiKey);

  try {
    // Fetch GitHub user profile.
    const profileResponse = await octokit.rest.users.getByUsername({ username }).catch(() => null);
    if (!profileResponse) {
      throw createError({ statusCode: 404, message: 'GitHub user not found' });
    }
    const profile = profileResponse.data as GithubProfile;

    // Fetch repositories.
    const reposResponse = await octokit.rest.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
      type: 'owner',
    }).catch(() => ({ data: [] }));
    const repos = reposResponse.data as GithubRepo[];

    // Attempt to fetch the user's README (if available).
    let userReadme = 'No README provided';
    try {
      const readmeResponse = await octokit.rest.repos.getReadme({
        owner: username,
        repo: username,
      });
      userReadme = Buffer.from(readmeResponse.data.content, 'base64').toString();
    } catch (error) {
      console.warn('README not found, continuing without it.');
    }

    // Fetch languages for each repo safely.
    const repoLanguages = await Promise.all(
      repos.map(async (repo) => {
        try {
          const { data } = await octokit.rest.repos.listLanguages({
            owner: username,
            repo: repo.name,
          });
          return data;
        } catch {
          return {};
        }
      })
    );

    // Calculate overall stats.
    const stats = {
      totalStars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
      totalForks: repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0),
      totalWatchers: repos.reduce((sum, repo) => sum + (repo.watchers_count || 0), 0),
      languages: repoLanguages.reduce((acc, langs) => {
        Object.entries(langs).forEach(([lang, bytes]) => {
          acc[lang] = (acc[lang] || 0) + (bytes as number);
        });
        return acc;
      }, {} as Record<string, number>),
      mostStarredRepo: repos.length > 0 ? repos.reduce((max, repo) =>
        (repo.stargazers_count || 0) > (max?.stargazers_count || 0) ? repo : max
      , repos[0]) : null,
      oldestRepo: repos.length > 0 ? repos.reduce((oldest, repo) =>
        new Date(repo.created_at) < new Date(oldest.created_at) ? repo : oldest
      , repos[0]) : null,
      newestRepo: repos.length > 0 ? repos.reduce((newest, repo) =>
        new Date(repo.created_at) > new Date(newest.created_at) ? repo : newest
      , repos[0]) : null
    };

    // Sort and pick top languages.
    const topLanguages = Object.entries(stats.languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([lang]) => lang);

    // Format repository information.
    const mostStarredRepoInfo = stats.mostStarredRepo
      ? `${stats.mostStarredRepo.name} (${stats.mostStarredRepo.stargazers_count} stars)`
      : 'No repositories found';

    const oldestRepoInfo = stats.oldestRepo
      ? `${stats.oldestRepo.name} (${new Date(stats.oldestRepo.created_at).toLocaleDateString()})`
      : 'No repositories found';

    const newestRepoInfo = stats.newestRepo
      ? `${stats.newestRepo.name} (${new Date(stats.newestRepo.created_at).toLocaleDateString()})`
      : 'No repositories found';

    // Prepare prompt for the AI model.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Write a fun (like slowly, casually telling a story with laughs and good things), engaging, and slightly playful analysis of this GitHub user's profile in a novel-like narrative style. 
      Include some light-hearted observations and friendly roasting where appropriate (but must do). Make it feel like a friend telling 
      another friend about someone interesting they discovered.

      Here's the user's data (but don't list these facts directly, weave them naturally into the story):

      Profile:
        - Name: ${profile.name || profile.login}
        - Bio: ${profile.bio || 'No bio provided'}
        - User Readme: ${userReadme}
        - Public Repos: ${profile.public_repos}
        - Followers: ${profile.followers}
        - Following: ${profile.following}
        - Account created: ${new Date(profile.created_at).toLocaleDateString()}

      Stats:
        - Total Stars: ${stats.totalStars}
        - Total Forks: ${stats.totalForks}
        - Top Languages: ${topLanguages.join(', ') || 'No major languages detected'}
        - Most Starred Repo: ${mostStarredRepoInfo}
        - First Repo: ${oldestRepoInfo}
        - Latest Repo: ${newestRepoInfo}

      Guidelines for the narrative:
      1. Start with an engaging hook about their coding journey
      2. Weave in observations about their evolution as a developer
      3. Make educated guesses about their personality and working style based on their repos and activity
      4. Include some playful observations about their language preferences and coding patterns
      5. Suggest potential future directions or hidden talents you spot.
      6. End with an encouraging and friendly note
      7. Keep the tone casual and fun, like a friend telling a story
      8. Feel free to make reasonable assumptions about their coding journey and interests
      9. (IMPORTANT) Include some light-hearted jokes or observations where appropriate. (must after every two lines like often crack really good jokes throughout the story please please).
      10. Write in paragraphs, not bullet points or markdown
      11. Also pinpoint what he is missing (if needed) and how he can improve, and just be a casual funny mentor.
      12. (IMPORTANT) Keep the language easy to read, simple good wording but not too simple to look like some 5 years old wrote.
      13. Try to be unique for each user.
      14. Among top-languages only count the major ones like used while coding not the extra ones like CMake and other languages like this which come with frameworks.

      Dont always start from "So, you won't BELIEVE (especially this word in CAPITAL ones) who I stumbled upon on GitHub", try different wording.
    `;

    const result = await model.generateContent(prompt);
    const analysisText = result.response.text();

    return {
      github_username: username.toLowerCase(),
      profile,
      stats,
      analysis: analysisText,
    };
  } catch (error: any) {
    console.error('Error:', error);
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'An unexpected error occurred while fetching GitHub data.',
    });
  }
});
