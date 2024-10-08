import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

const GIST_TOKEN = process.env.GIST_TOKEN;
const octokit = new Octokit({ auth: GIST_TOKEN });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('API route called with query:', req.query);
  const { username, page, per_page } = req.query;

  // 添加 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 如果是 OPTIONS 请求，直接返回 200
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

  try {
    console.log(`Fetching gists for user: ${username}, page: ${page}, per_page: ${per_page}`);
    const response = await octokit.gists.listForUser({
      username,
      page: page ? parseInt(page as string) : 1,
      per_page: per_page ? parseInt(per_page as string) : 5,
    });

    const gists = response.data;
    const link = response.headers.link || '';
    const hasNextPage = link.split(',').some(link => link.includes('rel="next"'));

    console.log(`Fetched ${gists.length} gists, hasNextPage: ${hasNextPage}`);

    res.status(200).json({
      gists,
      hasNextPage,
    });
  } catch (error) {
    console.error('Error fetching gists:', error);
    res.status(500).json({ error: 'Failed to fetch gists' });
  }
}