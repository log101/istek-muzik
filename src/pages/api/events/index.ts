import { getAuth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)

  if (!userId) {
    res.status(401).send({ error: "Unauthorized" })
  } else {
    if (req.method === "POST") {
      const locationTitle = req.body.locationTitle as string

      if (userId && locationTitle) {
        return prisma.event
          .create({
            data: {
              djId: userId,
              locationTitle
            }
          })
          .then(data => res.status(200).json({ data }))
          .catch(() => res.status(500).send({ error: "Error creating event" }))
      } else {
        res.status(400).send({ error: "Missing required fields" })
      }
    } else if (req.method === "GET") {
      return prisma.event
        .findMany({
          where: {
            djId: userId
          }
        })
        .then(posts => res.json(posts))
        .catch(() => {
          res.status(500).send({ error: "Error fetching events" })
        })
    }
  }
}
