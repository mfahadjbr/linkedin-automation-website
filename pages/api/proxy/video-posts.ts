import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { limit = 10, offset = 0 } = req.query
  // Use your actual cookie name for the token
  const token = req.cookies['token']

  if (!token) {
    return res.status(401).json({ success: false, error: 'No auth token found in cookies.' })
  }

  const backendUrl = `https://backend.postsiva.com/linkedin/video-post/my-posts?limit=${limit}&offset=${offset}`

  try {
    const backendRes = await fetch(backendUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    })
  const data = await backendRes.json()
  console.log('Video posts backend response:', data)
  res.status(backendRes.status).json(data)
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Proxy error' })
  }
}