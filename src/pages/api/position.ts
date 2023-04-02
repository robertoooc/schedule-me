import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userFromRequest } from "@/web/tokens";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const user = await userFromRequest(req);
  if (method == "POST") {
    // if (user == undefined) res.status(404).json({ msg: "user not found" });
    if (user == undefined) throw Error("no user logged in");

    try {
      if (user.organizationId == null) {
        res.status(404).json({ msg: "user belongs to no company" });
        throw Error("user belongs to no company");
      }

      const findCompany = await prisma.organization.findUnique({
        where: {
          id: user.organizationId,
        },
      });

      const positionName:string = req.body.positionName
      // if(!positionName) console.log('noooooooo')
      // console.log(positionName,'🧶')
      const findPosition = await prisma.position.create({
        data:{
          name: positionName,
          organization: {
            connect:{
              id: user.organizationId
            }
          }
        }
      })

    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "yo my bad" });
    }
  } else if (method == "GET") {
    try {
      const companyId = req.body.companyId;
      const findCompany = await prisma.organization.findUnique({
        where: {
          id: companyId,
        },
      });
      console.log(findCompany);
      res.status(200).json(findCompany);
    } catch (err) {
      res.status(400).json({ msg: "yo my bad" });
    }
  } else if (method == "PUT") {
    const companyId = req.body.companyId;
    try {
      const findCompany = await prisma.organization.findUnique({
        where: {
          id: companyId,
        },
      });

      if (!findCompany) throw Error("company not found");
      if (user == undefined) throw Error("No user");

      const updateCompany = await prisma.organization.update({
        where: {
          id: companyId,
        },
        data: {
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
      console.log(updateCompany);
      res.status(200).json(updateCompany);
    } catch (err) {
      res.status(400).json({ msg: "yo my bad" });
    }
  }
};

export default handler;
