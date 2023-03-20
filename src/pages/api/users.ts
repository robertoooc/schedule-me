import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { User } from "../types/types";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      //some code...
      res.status(200).json({});
      break;

    case "POST":
      try{
        const {name, email, password}:{name:string, email:string, password:string} = req.body.user
        const users:User = req.body.user
        console.log(name)
        // const user = await prisma.user.create(users)
        res.status(201).json({});
      }catch(err){
        res.status(400).json({msg: 'yo my bad'})
      }
      break;

    case "PUT":
      //some code...
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
