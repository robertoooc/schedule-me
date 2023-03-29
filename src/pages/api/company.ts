import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userFromRequest } from "@/web/tokens";

const prisma = new PrismaClient();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const user = await userFromRequest(req);
  if (method == "POST") {
    if (user == undefined) res.status(404).json({ msg: "user not found" });
    try{
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

    }catch(err){
      console.log(err)
      res.status(400).json({ msg: "yo my bad" });
    }
  }
};

export default handler;

