import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { authenticateUser, clearUser } from "@/web/tokens";
import nextConnect from "next-connect";

const prisma = new PrismaClient();

const handler = nextConnect()
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email, password }: { email: string; password: string } =
        req.body.user;
      const findUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!findUser) return res.status(404).json({ msg: "user not found" });

      if (await argon2.verify(findUser?.password, password)) {
        const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;
        if (JWT_TOKEN_KEY) {
          authenticateUser(res, findUser);
          res.status(200).json(findUser);
        }
      } else {
        res.status(400).json({ msg: "incorrect password or email" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "yo my bad" });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    clearUser(res);
    res.status(200).json({ msg: "user signed out" });
  });

export default handler;
