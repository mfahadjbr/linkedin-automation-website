import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { limit = 10, offset = 0 } = req.query
  const apiUrl = `https://backend.postsiva.com/linkedin/video-post/my-posts?limit=${limit}&offset=${offset}`
  const authHeader = req.headers['authorization'] || req.cookies['auth-token']
  try {
    const apiRes = await fetch(apiUrl, {
      headers: {
        'accept': 'application/json',
        'Authorization': authHeader || ''
      }
    })
    const data = await apiRes.json()
    res.status(apiRes.status).json(data)
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch video posts' })
  }
}