import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { authenticateUser, clearUser } from "@/web/tokens";
import defaultHandler from "../_defaultHandler";
import jwt from "jsonwebtoken";
import nextConnect from "next-connect";

const prisma = new PrismaClient();
declare var process: {
  env: {
    JWT_TOKEN_KEY: string;
  };
};

const handler = nextConnect()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
    } catch (err) {
      console.log(err);
    }
  })
  .post(defaultHandler,async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("we in here");
    try {
      const token = req.cookies?.token;
      if (!token || token == undefined) throw new Error("JWT token is missing");

      interface JWTPayload {
        email: string;
        iat: number;
        exp: number;
      }
      const decode = await (<JWTPayload>(
        jwt.verify(token, process.env.JWT_TOKEN_KEY)
      ));
      console.log(decode);
      const findUser = await prisma.user.findUnique({
        where: {
          email: decode.email,
        },
      });
      if (!findUser) throw new Error("Cannot Find User");

      const companyName = req.body.companyName;
      const findCompany = await prisma.organization.findUnique({
        where: {
          name: companyName,
        },
      });
      if (findCompany) throw new Error("Company already exists");

      const newCompany = await prisma.organization.create({
        data: {
          name: companyName,
        },
      });

      console.log(newCompany);
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
