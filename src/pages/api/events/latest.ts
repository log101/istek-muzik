import { getAuth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)

  if (!userId) {
    res.status(401).send({ error: "Unauthorized" })
  } else {
    if (req.method === "GET") {
      return prisma.event
        .findMany({
          where: {
            djId: userId,
            finished: false,
            active: false
          },
          orderBy: {
            updatedAt: "desc"
          },
          take: 1
        })
        .then(posts => {
          if (posts.length) {
            res.json(posts[0])
          } else {
            res.status(404).send({ error: "There is no active event" })
          }
        })
        .catch(() => {
          res.status(500).send({ error: "Error getting active event" })
        })
    } else {
      res.status(400).send({ error: "HTTP Method Not Supported" })
    }
  }
}
