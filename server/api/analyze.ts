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

    // Fetch all repository READMEs
    const repoReadmes = await Promise.all(
      repos.map(async (repo) => {
        try {
          const readmeResponse = await octokit.rest.repos.getReadme({
            owner: username,
            repo: repo.name,
          });
          return {
            repo: repo.name,
            content: Buffer.from(readmeResponse.data.content, 'base64').toString(),
          };
        } catch {
          return { repo: repo.name, content: '' };
        }
      })
    );

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

    // Advanced analytics
    const userAnalytics = {
      // Activity analysis
      accountAge: Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)),
      isNewUser: Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)) < 90,
      isVeteran: Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)) > 1825,
      
      // Repository analysis
      hasSignificantProjects: repos.some(r => r.stargazers_count > 50),
      topProjects: repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map(repo => ({
          name: repo.name,
          stars: repo.stargazers_count,
          description: repo.description,
          url: repo.html_url
        })),

      // Skills assessment
      primaryLanguages: Object.entries(stats.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang),
      
      // Content analysis
      hasDetailedReadmes: repoReadmes.filter(r => r.content.length > 500).length > (repos.length * 0.3),
      
      // Contribution patterns
      contributionFocus: repos.reduce((acc, repo) => {
        const topic = detectRepoTopic(repo.name, repo.description || '');
        acc[topic] = (acc[topic] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    // Psychological profile generation
    const userPersona = determineUserPersona(userAnalytics, profile, stats);

    const prompt = `
Generate a professional yet personable GitHub profile README using GitHub Flavored Markdown. Create content that matches this user persona: ${userPersona.type}

Key Data Points:
- Name: ${profile.name || profile.login}
- Experience: ${userAnalytics.accountAge} years on GitHub
- Top Languages: ${userAnalytics.primaryLanguages.join(', ')}
- Focus Areas: ${Object.keys(userAnalytics.contributionFocus).join(', ')}

Content Requirements:
1. Header Section
   - Use a dynamic greeting based on time of day
   - Include profile views badge: ![Profile Views](https://komarev.com/ghpvc/?username=${username})
   - If veteran user, add "Years on GitHub" badge
   - Optional quote if persona matches: ${userPersona.quote}

2. About Me Section
   - Incorporate bio: ${profile.bio || 'Software Developer'}
   - Location if available: ${profile.location || ''}
   - Highlight key strengths: ${userPersona.strengths.join(', ')}

3. Skills & Technologies
   - Use shield.io badges for top technologies
   - Group by: Languages, Frameworks, Tools
   - Only include technologies with significant usage

4. Projects Section (if noteworthy projects exist)
   - Highlight top ${Math.min(3, userAnalytics.topProjects.length)} projects
   - Include: Title, Description, Stars, Tech Stack
   - Add live demo links if available

5. GitHub Stats
   - Include dynamic stats using shields.io:
     - Total Stars: ${stats.totalStars}
     - Repositories: ${profile.public_repos}
     - Contributions: Use GitHub Stats card
   - Only if impressive numbers (>50 stars or >500 contributions)

6. Connect Section
   - Add social media badges (prioritize professional networks)
   - Include blog/portfolio if available
   - Use custom-colored shields.io badges

Style Guidelines:
- Use HTML sparingly, prefer native markdown
- Maintain professional tone with ${userPersona.tone} elements
- Include subtle animations (GitHub-supported)
- Use emojis strategically (max 1-2 per section)

Additional Customization:
${userPersona.customizations}

Avoid:
- Generic content
- Excessive badges/stats
- Non-professional information
- Complex HTML structures
- Empty/placeholder sections

Output the raw content without any code block markers or quotes.
Focus on ${userPersona.focus} based on user analysis.
If including tables, only use for ${userPersona.tableUsage}.
`;

    // Helper function for topic detection
    function detectRepoTopic(name: string, description: string): string {
      const topics = {
        webapp: /(web|app|site|frontend|backend)/i,
        library: /(library|framework|sdk|toolkit)/i,
        devops: /(deploy|docker|kubernetes|ci|cd)/i,
        datascience: /(data|ml|ai|analytics)/i,
        mobile: /(ios|android|mobile|app)/i,
        security: /(security|crypto|auth)/i
      };

      const text = `${name} ${description}`.toLowerCase();
      for (const [topic, pattern] of Object.entries(topics)) {
        if (pattern.test(text)) return topic;
      }
      return 'other';
    }

    // Helper function for persona generation
    function determineUserPersona(analytics: any, profile: any, stats: any) {
      const personas = {
        veteran: {
          type: 'Seasoned Developer',
          tone: 'confident yet approachable',
          focus: 'achievements and expertise',
          tableUsage: 'significant project metrics',
          strengths: ['Technical Leadership', 'Project Architecture', 'Mentorship'],
          quote: '"Building the future, one commit at a time"',
          customizations: 'Emphasize long-term impact and industry expertise'
        },
        active: {
          type: 'Active Contributor',
          tone: 'energetic and collaborative',
          focus: 'current projects and contributions',
          tableUsage: 'contribution statistics',
          strengths: ['Rapid Learning', 'Team Collaboration', 'Problem Solving'],
          quote: '"Turning coffee into code"',
          customizations: 'Highlight contribution streaks and active projects'
        },
        specialist: {
          type: 'Domain Specialist',
          tone: 'technical and precise',
          focus: 'specialized knowledge and projects',
          tableUsage: 'technical specifications',
          strengths: ['Deep Domain Knowledge', 'Technical Writing', 'Solution Design'],
          quote: '"Mastery through specialization"',
          customizations: 'Emphasize domain expertise and technical depth'
        },
        rising: {
          type: 'Rising Developer',
          tone: 'enthusiastic and growth-oriented',
          focus: 'learning journey and progress',
          tableUsage: 'skill progression',
          strengths: ['Quick Learning', 'Fresh Perspective', 'Modern Tech Stack'],
          quote: '"Every bug is a learning opportunity"',
          customizations: 'Showcase learning path and growth metrics'
        }
      };

      // Determine persona based on analytics
      if (analytics.isVeteran && analytics.hasSignificantProjects) {
        return personas.veteran;
      } else if (analytics.hasDetailedReadmes && Object.keys(analytics.contributionFocus).length < 3) {
        return personas.specialist;
      } else if (profile.public_repos > 15 && stats.totalStars > 50) {
        return personas.active;
      } else {
        return personas.rising;
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let readmeContent = result.response.text();
    
    // Clean up and format the response
    readmeContent = readmeContent
      .replace(/```[a-z]*\n/g, '')
      .replace(/```\n/g, '')
      .replace(/^\s*```\s*$/, '')
      .trim();

    return {
      github_username: username.toLowerCase(),
      profile,
      stats,
      analytics: userAnalytics,
      persona: determineUserPersona(userAnalytics, profile, stats),
      readme: readmeContent,
    };

  } catch (error: any) {
    console.error('Error:', error);
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'An unexpected error occurred while fetching GitHub data.',
    });
  }
});
