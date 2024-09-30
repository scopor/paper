import { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

const GIST_TOKEN = process.env.GIST_TOKEN;
const octokit = new Octokit({ auth: GIST_TOKEN });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username, page, per_page } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await octokit.gists.listForUser({
      username,
      page: page ? parseInt(page as string) : 1,
      per_page: per_page ? parseInt(per_page as string) : 5,
    });

    const gists = response.data;
    const link = response.headers.link || '';
    const hasNextPage = link.split(',').some(link => link.includes('rel="next"'));

    res.status(200).json({
      gists,
      hasNextPage,
    });
  } catch (error) {
    console.error('Error fetching gists:', error);
    res.status(500).json({ error: 'Failed to fetch gists' });
  }
}
