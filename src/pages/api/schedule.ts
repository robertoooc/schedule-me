import type { NextApiRequest, NextApiResponse } from "next";
import { organization, PrismaClient, User } from "@prisma/client";
import { userFromRequest } from "@/web/tokens";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const user = await userFromRequest(req);
  const { method } = req;
  if (method == "POST") {
    // console.log(user)
    try {
      const date = new Date(2023,4,4,10).toLocaleString()
      const date2 = new Date(2023,4,4,10,30).toLocaleString()
      console.log(date);
      console.log(date2)
      await prisma.schedule.deleteMany()
      // const day = await prisma.schedule.create({
      //   data: {
      //     workDate: date,
      //     startTime: 10.0,
      //     endTime: 18.0,
      //     user: {
      //       connect: {
      //         email: "register@register",
      //       },
      //     },
      //   },
      //   include: {
      //     user: true,
      //   },
      // });
      // console.log(day)
      res.status(200).json(date);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
