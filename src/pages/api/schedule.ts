import type { NextApiRequest, NextApiResponse } from "next";
import { organization, PrismaClient, User } from "@prisma/client";
import { userFromRequest } from "@/web/tokens";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const user = await userFromRequest(req);
  const { method } = req;
  if(method == 'POST'){
    
  }


};

export default handler;
