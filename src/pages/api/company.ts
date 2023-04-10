import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userFromRequest } from "@/web/tokens";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const user = await userFromRequest(req);
  if (method == "POST") {
    if (user == undefined) res.status(404).json({ msg: "user not found" });

    try {
      const companyName:string = req.body.companyName;
      const findCompany = await prisma.organization.findUnique({
        where: {
          name: companyName,
        },
      });
      if (findCompany) throw new Error("Company already exists");

      if (user == undefined) throw Error("no user logged in");

      const updateuser = await prisma.user.update({
        where:{
          id: user.id
        },
        data:{
          hiearchy: 'ADMIN'
        }
      })

      const newCompany = await prisma.organization.create({
        data: {
          name: companyName,
          employees: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          employees: true,
        },
      });

      console.log(newCompany);
      res.status(200).json(newCompany);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "yo my bad" });
    }
  } else if (method == "GET") {
    if (user == undefined) res.status(404).json({ msg: "user not found" });
    try {
      // const companyId:string = req.body.companyId;
      if(!user?.organizationId) throw Error('user does not have permission')
      const findCompany = await prisma.organization.findUnique({
        where: {
          id: user?.organizationId,
        },include:{
          employees:true
        }
      });
      if(findCompany){
        findCompany.employees.forEach((user)=>{
          console.log(user)
        })
      }
      console.log(findCompany);
      res.status(200).json(findCompany);
    } catch (err) {
      res.status(400).json({ msg: "yo my bad" });
    }
  } else if( method == "PUT"){
    const companyId:string = req.body.companyId;
    try{
      const findCompany = await prisma.organization.findUnique({
        where: {
          id: companyId,
        },
      });
      
      if(!findCompany) throw Error('company not found')
      if(user == undefined) throw Error('No user')
      
      const updateCompany = await prisma.organization.update({
        where:{
          id: companyId
        },
        data:{
          employees:{
            connect:{
              id: user.id
            }
          }
        },
        include:{
          employees:true
        }
      }
      )
      console.log(updateCompany)
      res.status(200).json(updateCompany)
    }catch(err){
      res.status(400).json({ msg: "yo my bad" });
    }
  }
};

export default handler;
