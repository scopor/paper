import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const GIST_TOKEN = process.env.GIST_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username, page = '1', per_page = '5' } = req.query;

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
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/gists`, {
      params: {
        page: page,
        per_page: per_page
      },
      headers: {
        'Authorization': `Bearer ${GIST_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const gists = response.data;
    const link: string = response.headers['link'] || '';
    const hasNextPage = link.split(',').some(link => link.includes('rel="next"'));

    res.status(200).json({
      gists,
      hasNextPage,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ 
        error: 'Failed to fetch gists', 
        details: error.response?.data || error.message 
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch gists', details: 'An unexpected error occurred' });
    }
  }
}
