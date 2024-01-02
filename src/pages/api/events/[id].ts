import { getAuth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)
  const { id } = req.query

  if (!userId) {
    res.status(401).send({ error: "Unauthorized" })
  } else {
    if (req.method === "GET") {
      return prisma.event
        .findUnique({
          where: {
            id: Number(id)
          }
        })
        .then(post => {
          if (post) {
            res.json(post)
          } else {
            res.status(404).send({ error: "There is no active event" })
          }
        })
        .catch(() => {
          res.status(500).send({ error: "Error getting event" })
        })
    } else {
      res.status(400).send({ error: "HTTP Method Not Supported" })
    }
  }
}
