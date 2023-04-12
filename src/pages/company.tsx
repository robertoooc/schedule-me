import { GetServerSidePropsContext } from "next";
import { organization, User } from "@prisma/client";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
import React, { useEffect, useState } from "react";
import SuperJSON from "superjson";
import RegisterCompany from "@/components/RegisterCompany";
import { findCompany } from "./api/company";
import { useRouter } from 'next/navigation';
interface Props {
  user?: User;
  companyInfo: organization | undefined;
}

export default function Company({ user, companyInfo }: Props) {
  const [positionName, setPositionName] = useState<string>("");
  const router = useRouter();
  console.log(companyInfo)
  useEffect(()=>{
    if(companyInfo == undefined) router.push('/organization')
  },[])

  
  return(
    <div>
      <form>
        <input/>
      </form>
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
