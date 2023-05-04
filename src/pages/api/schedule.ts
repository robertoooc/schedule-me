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
      const startTime = new Date(2023, 4, 4, 10);
      const endTime = new Date(2023, 4, 4, 15, 30);
      const weekStart = new Date(2023, 4, 1);
      const weekEnd = new Date(2023, 4, 7);

      const newDay = await prisma.workDay.create({
        data: {
          startTime: startTime,
          endTime: endTime,
        },
      });

      const newWeek = await prisma.schedule.create({
        data: {
          weekStart: weekStart,
          weekEnd: weekEnd,
          workDays: {
            connect: {
              id: newDay.id,
            },
          },
          user: {
            connect: {
              email: "register@register",
            },
          },
        },
        include: {
          workDays: true,
          user: true,
        },
      });
      console.log(newWeek)
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
      // res.status(200).json(date);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
