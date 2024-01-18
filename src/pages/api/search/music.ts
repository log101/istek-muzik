import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spotifyApiUrl = "https://accounts.spotify.com/api/token"

  if (req.method === "POST") {
    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID
      const clientSecret = process.env.SPOTIFY_SECRET_KEY

      const response = await fetch(spotifyApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      res.status(200).json(data)
    } catch (err) {
      console.error("Error fetching Spotify token:", err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  } else if (req.method === "GET") {
    if (req.query.q && req.query.token) {
      const searchQuery = encodeURIComponent(req.query.q as string)
      const searchType = "track"

      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&market=TR`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${req.query.token}`
          }
        }
      )

      if (!searchResponse.ok) {
        throw new Error(`HTTP error! Status: ${searchResponse.status} ${searchResponse}`)
      }

      const searchData = await searchResponse.json()
      res.status(200).json(searchData)
    } else {
      res.status(400).json({ error: 'Missing query parameter "q" for search.' })
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}
