import { GetServerSidePropsContext } from "next";
import { organization, Position, User } from "@prisma/client";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
import React, { useEffect, useState } from "react";
import SuperJSON from "superjson";
import { findCompany } from "./api/company";
import { useRouter } from "next/navigation";
import Employees from "@/components/Employees";
import Positions from "@/components/Positions";
interface company {
  id: string;
  name: string;
  employees?: User[];
  positions?: Position[];
}
interface Props {
  user?: User;
  companyInfo: company | undefined;
}

export default function Company({ user, companyInfo }: Props) {
  const [positionName, setPositionName] = useState<string>("");
  const [seeEmployees, setSeeEmployees] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (companyInfo == undefined) router.push("/organization");
  }, []);

  const createPosition = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/position", { positionName });
      console.log(response.data, "🍉");
    } catch (err) {
      console.log(err);
    }
  };

  let userInfo;
  if (companyInfo?.employees != undefined)
    userInfo = <Employees users={companyInfo?.employees} />;

  let positionInfo;
  if (companyInfo?.positions != undefined)
    positionInfo = <Positions positions={companyInfo.positions} />;

  return (
    <div>
      <div className="text-center bg-sky-400 ">
        <p className=" text-3xl text-gray-100 font-bold py-3">
          {companyInfo?.name}
        </p>
      </div>
      <button onClick={() => setSeeEmployees(!seeEmployees)}>
        {!seeEmployees ? `Employees` : `Positions`}
      </button>
      <div className="">{seeEmployees ? userInfo : positionInfo}</div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };

  const companyInfo = await findCompany(user);

  return {
    props: SuperJSON.serialize({
      user,
      companyInfo,
    }).json,
  };
}
