import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { User } from "../types/types";
const prisma = new PrismaClient();
// const prisma = new PrismaClient({ datasources: {  db: { url: `${process.env.DATABASE_URL}` } } });

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
        console.log(process.env.DATABASE_URL)
        const user = await prisma.user.create({
          data: {
            name: name,
            email: email,
            password:password
          }
        })
        console.log(user)
        res.status(201).json({});
      }catch(err){
        console.log(err)
        res.status(400).json({msg: 'yo my bad'})
      }
      break;

    case "PUT":
      try{
        const {name, email, password}:{name:string, email:string, password:string} = req.body.user
        const user = await prisma.user.findFirst()
        if (user){
          // const org = await prisma.organization.create({
          //   data:{
          //     name: 'test-orgs'
          //   }
          // })
          const org = await prisma.organization.findUnique({
            where:{
              name: 'test-orgs'
            }
          })
          console.log(org)
        }
        
        
      }catch(err){
        console.log(err)
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
