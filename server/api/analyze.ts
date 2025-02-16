import { Octokit } from 'octokit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getQuery } from 'h3';

interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  created_at: string;
  html_url: string;
}

interface GithubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  public_repos: number;
  created_at: string;
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

  // Initialize GitHub API and Gemini Generative AI.
  const octokit = new Octokit({ auth: config.public.githubToken });
  const genAI = new GoogleGenerativeAI(config.public.geminiApiKey);

  try {
    // Fetch the GitHub user profile.
    const profileResponse = await octokit.rest.users.getByUsername({ username });
    const profile = profileResponse.data as GithubProfile;

    // Fetch repositories owned by the user.
    const reposResponse = await octokit.rest.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
      type: 'owner',
    });
    const repos = reposResponse.data as GithubRepo[];

    // Aggregate language usage across repositories.
    const languageUsage: Record<string, number> = {};
    for (const repo of repos) {
      try {
        const { data } = await octokit.rest.repos.listLanguages({
          owner: username,
          repo: repo.name,
        });
        Object.entries(data).forEach(([lang, bytes]) => {
          languageUsage[lang] = (languageUsage[lang] || 0) + (bytes as number);
        });
      } catch {
        // Ignore errors for individual repos.
      }
    }
    const topLanguages = Object.entries(languageUsage)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([lang]) => lang)
      .join(', ') || 'Not available';

    // Calculate overall stats.
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const accountAge = Math.floor(
      (new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
    );

    // Identify top projects (sorted by stars).
    const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    const topProjects = sortedRepos.slice(0, 3).map((repo) => ({
      name: repo.name,
      description: repo.description || 'No description provided',
      stars: repo.stargazers_count,
      // For simplicity, infer tech stack from repo name/languages is omitted.
      techStack: 'N/A',
    }));

    // Decide if we want a table based on project quality:
    // If all top projects have 10+ stars, then use a table; otherwise, list them as bullet points.
    const useTable = topProjects.length > 0 && topProjects.every((p) => p.stars >= 10);

    // Construct the prompt for Gemini.
    const prompt = `
Generate a professional, fully auto-populated GitHub profile README in GitHub Flavored Markdown. 
The README must be mostly text-based with minimal extra formatting. Do not use any badges.

Use the following GitHub data:
- Username: ${profile.name || profile.login}
- Account Age: ${accountAge} years
- Total Stars: ${totalStars}
- Number of Repositories: ${profile.public_repos}
- Top Languages: ${topLanguages}
- Bio: "${profile.bio || 'Software Developer'}"
- Location: "${profile.location || 'Not specified'}"

Content Requirements:

2. About Me:
   - Present the bio and location.
   - Include a short statement about the user's strengths. For example, if account age > 2 years and total stars > 50, mention "extensive experience and a proven track record"; otherwise, mention "a quick learner with an innovative approach."
   - Use a professional yet personable tone.

3. Skills & Technologies:
   - List the top programming languages as text. like in a descriptive way that I can work with this stacks.
   - Mention any additional frameworks or tools if inferred from the data (optional).

4. Projects:
   ${
     useTable
       ? `- Include a table listing the top ${topProjects.length} projects (each having 10 or more stars). 
  The table should have the following columns: Title (linked with the repo), Stars, Tech Stack.
  
  Use this exact table format:
<table>
  <thead>
    <tr><th>Title</th><th>Description</th><th>Stars</th><th>Tech Stack</th></tr>
  </thead>
  <tbody>
    ${topProjects
      .map(
        (proj) =>
          `<tr><td>${proj.name}</td><td>${proj.stars}</td><td>${proj.techStack}</td></tr>`
      )
      .join('\n')}
  </tbody>
</table>`
       : `- List the top projects as bullet points. For each project, provide the Title, a short Description, Star count, and Tech Stack. 
  Example:
    • ${topProjects
      .map(
        (proj) =>
          `${proj.name}: ${proj.description} (Stars: ${proj.stars}, Tech Stack: ${proj.techStack})`
      )
      .join('\n    • ')}`
   }

5. GitHub Stats:
   - Summarize the total stars and the number of repositories in plain text. 

6. Connect:
   - End with a brief invitation for viewers to connect with the user on GitHub and other professional networks if available. add lines like LinkedIn, X, Bluesky so that user can fill the links.

Style Guidelines:
- The README must be primarily text-based with minimal extra formatting.
- Do not include any badges.
- Use standard Markdown formatting.
- Output the raw Markdown content without code block markers or extra quotes.
`;

    // Generate the README using Gemini.
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let readmeContent = result.response.text();
    readmeContent = readmeContent
      .replace(/```[a-z]*\n/g, '')
      .replace(/```\n/g, '')
      .replace(/^\s*```\s*$/, '')
      .trim();

    return {
      github_username: username.toLowerCase(),
      profile,
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
