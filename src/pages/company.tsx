import { GetServerSidePropsContext } from "next";
import { organization, Position, User } from "@prisma/client";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
import React, { useEffect, useState } from "react";
import SuperJSON from "superjson";
import RegisterCompany from "@/components/RegisterCompany";
import { findCompany } from "./api/company";
import { useRouter } from 'next/navigation';
import Employees from "@/components/Employees";
interface company{
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
  const router = useRouter();
  console.log(companyInfo)
  useEffect(()=>{
    if(companyInfo == undefined) router.push('/organization')
  },[])
  // console.log(companyInfo.employees)
  const userInfo = companyInfo?.employees !=undefined ? companyInfo?.employees.forEach((user)=>{
    return <Employees users={user}/>
  }) : <div></div>
  return(
    <div>
      <div className="text-center bg-sky-400 ">
        <p className=" text-3xl text-gray-100 font-bold py-3">{companyInfo?.name}</p>
      </div>
      <div>
        {userInfo}
      </div>
      <div>
        <p>Employees</p>
        {/* <Employees users={companyInfo?.employees}/> */}
      </div>
      <div>
        <p>Positions</p>
        {/* <Employees users={companyInfo?.employees}/> */}
      </div>
    </div>
  )
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
