import { GetServerSidePropsContext } from "next";
import { userFromRequest } from "@/web/tokens";
import { findCompany } from "./api/company";
import SuperJSON from "superjson";
import { getPositionInfo } from "./api/position";
import { User, Position } from "@prisma/client";
import { useState } from "react";
import Select from "react-select";

interface company {
  // id: string;
  name: string;
  employees?: User[];
  positions?: Position[];
}
interface Props {
  user?: User;
  companyInfo: company;
  positionInfo: Position;
}
export default function Positions({ user, companyInfo, positionInfo }: Props) {
  const [value, setValue] = useState<string[]>([]);
  const options = companyInfo?.employees?.map((user)=>{
    return {value: user.id, label:user.name}
  })
  const handleUserChange=(selected:any)=>{
    // setValue(selected.value)
    const users = selected.map((user:{value:string,label:string}) =>{return user.value})
    console.log(users)
    setValue(users)
  }
  const addUser = async (e: any) => {
    e.preventDefault();
  };
  
  return (
    <div>
      <p>{positionInfo.name}</p>
      <form onSubmit={addUser}>
        <Select isMulti options={options} onChange={(value)=>handleUserChange(value)} instanceId='selectUser'/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);
  const { id } = context.query;

  if (!user) return { props: {} };

  const companyInfo = await findCompany(user);
  if (id == null || id == undefined || Array.isArray(id)) return { props: {} };
  const positionInfo = await getPositionInfo(id);
  console.log(positionInfo);
  return {
    props: SuperJSON.serialize({
      user,
      companyInfo,
      positionInfo,
    }).json,
  };
}
