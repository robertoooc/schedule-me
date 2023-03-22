import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {

      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "yo my bad" });
      }
      break;

    case "DELETE":
      //some code...
      res.status(200).json({});
      break;

    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
}
