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

      const positionName: string = req.body.positionName;
      // if(!positionName) console.log('noooooooo')
      // console.log(positionName,'🧶')
      const findPosition = await prisma.position.create({
        data: {
          name: positionName,
          organization: {
            connect: {
              id: user.organizationId,
            },
          },
        },
      });
      console.log(findPosition);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "yo my bad" });
    }
  } else if (method == "GET") {
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

      const positionName: string = req.body.positionName;
      const findPosition = await prisma.position.create({
        data: {
          name: positionName,
          organization: {
            connect: {
              id: user.organizationId,
            },
          },
        },
      });
      console.log(findPosition);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "yo my bad" });
    }
  } else if (method == "PUT") {
    try {
      if (user == undefined) throw Error("no user logged in");

      const positionId = req.body.positionId;
      const newUserToAdd = req.body.newUserToAdd
      const findPosition = await prisma.position.findUnique({
        where: {
          id: positionId,
        },
      });
      if (!findPosition) throw Error("position not found");

      const updatePosition = await prisma.position.update({
        where:{
          id:positionId
        },
        data:{
          users:{
            connect:{
              id:newUserToAdd
            }
          }
        },
        include:{
          users:true
        }
      })
      console.log(updatePosition)
    } catch (err) {
      console.log(err)
      res.status(400).json({ msg: "yo my bad" });
    }
  }
};

export default handler;
