import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit }  from '@octokit/rest';

const octokit = new Octokit({ auth: GIST_TOKEN });
const GIST_TOKEN = process.env.GIST_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('API route called with query:', req.query);
  const { username, page, per_page } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' });
  }

  if (!GIST_TOKEN) {
    console.error('GIST_TOKEN is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  console.log(GIST_TOKEN);

  try {
    console.log(`Fetching gists for user: ${username}, page: ${page}, per_page: ${per_page}`);
    const response = await octokit.gists.listForUser({
      username,
      page: page ? parseInt(page as string) : 1,
      per_page: per_page ? parseInt(per_page as string) : 5,
    });

    console.log(JSON.stringify(response));

    const gists = response.data;
    const link: string = response.headers.link || '';
    const hasNextPage = link.split(',').some(link => link.includes('rel="next"'));

    console.log(`Fetched ${gists.length} gists, hasNextPage: ${hasNextPage}`);

    res.status(200).json({
      gists,
      hasNextPage,
    });
  } catch (error) {
    console.error('Error fetching gists:', JSON.stringify(error));
    res.status(500).json({ error: 'Failed to fetch gists' });
  }
}
