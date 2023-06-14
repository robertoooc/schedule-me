import type { NextApiRequest, NextApiResponse } from "next";
import { organization, PrismaClient, User } from "@prisma/client";
import { userFromRequest } from "@/web/tokens";

const prisma = new PrismaClient();

export async function findCompany(user: User) {
  try {
    if (!user?.organizationId) throw Error("user does not have permission");

    const findCompany = await prisma.organization.findUnique({
      where: {
        id: user?.organizationId,
      },
      include: {
        employees: true,
        positions: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
                hiearchy: true,
                position: true,
                organization: true,
              },
            },
          },
        },
      },
    });
    // console.log(findCompany?.positions[1], "🧶");
    if (findCompany) {
      findCompany.employees.forEach((user) => {
        user.password = "";
        // console.log(user)
      });
    }
    // console.log(findCompany,'😡');
    return findCompany;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await userFromRequest(req);
  // console.log(await userFromRequest(req))
  const { method } = req;
  // console.log(user,"🧶")
  if (method == "POST") {
    if (user == undefined) res.status(404).json({ msg: "user not found" });

    try {
      const companyName: string = req.body.companyName;
      const findCompany = await prisma.organization.findUnique({
        where: {
          name: companyName,
        },
      });
      if (findCompany) throw new Error("Company already exists");

      if (user == undefined) throw Error("no user logged in");

      const updateuser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          hiearchy: "ADMIN",
        },
      });

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
    // console.log(user,'🧶')
    if (!user) res.status(404).json({ msg: "user not found" });
    try {
      // const companyId:string = req.body.companyId;
      // if(user?.organizationId !=null || user?.organizationId!= undefined) throw Error('user does not have permission')
      res.status(200).json(findCompany);
    } catch (err: any) {
      res.status(400).json({ msg: err.message });
    }
  } else if (method == "PUT") {
    const companyId: string = req.body.companyId;
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
