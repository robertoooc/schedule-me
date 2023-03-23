import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const cookieOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: "/",
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
};

function setCookie(
  res: any,
  name: string,
  value: string,
  options: Record<string, unknown> = {}
): void {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  res.setHeader("Set-Cookie", serialize(name, String(stringValue)));
  // res.setHeader("Set-Cookie", serialize(name, String(stringValue, options)))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
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
            const token = jwt.sign({ email: findUser.email }, JWT_TOKEN_KEY, {
              expiresIn: "1d",
            });
            setCookie(res, "auth", token, cookieOptions);
          }
        } else {
          
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "yo my bad" });
      }
      break;

    case "DELETE":
      setCookie(res, "auth", "0", {
        ...cookieOptions,
        path: "/",
        maxAge: 1,
      });
      res.status(200).json({});
      break;

    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
}
