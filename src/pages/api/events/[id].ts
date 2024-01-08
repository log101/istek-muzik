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
    } else if (req.method === "PUT") {
      const { newLocationTitle } = req.body

      if (!newLocationTitle) {
        res.status(400).send({ error: "New location title is required" })
      } else {
        return prisma.event
          .update({
            where: {
              id: Number(id)
            },
            data: {
              locationTitle: newLocationTitle
            }
          })
          .then(post => {
            if (post) {
              res.json(post)
            } else {
              res.status(404).send({ error: "Event could not be found" })
            }
          })
          .catch(() => {
            res.status(500).send({ error: "Event could not be updated" })
          })
      }
    } else {
      // TODO: handle delete method
      res.status(400).send({ error: "HTTP Method Not Supported" })
    }
  }
}
