import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      //some code...
      res.status(200).json({});
      break;

    case "POST":
      try {
        const {
          name,
          email,
          password,
        }: { name: string; email: string; password: string } = req.body.user;
        const findUser = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (findUser)
          return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await argon2.hash(password)
        const createUser = await prisma.user.create({
          data:{
            name: name,
            email:email,
            password:hashedPassword  
          }
        })
        res.status(200).json(createUser)
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "yo my bad" });
      }
      break;

    case "PUT":
      try {
        const {
          name,
          email,
          password,
        }: { name: string; email: string; password: string } = req.body.user;
        const user = await prisma.user.findFirst();
        if (user) {
          // const org = await prisma.organization.create({
          //   data:{
          //     name: 'test-orgs'
          //   }
          // })
          const org = await prisma.organization.findUnique({
            where: {
              name: "test-orgs",
            },
          });
          console.log(org);
        }
      } catch (err) {
        console.log(err);
      }
      res.status(200).json({});
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
