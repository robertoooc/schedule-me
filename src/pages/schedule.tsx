import { GetServerSidePropsContext } from "next";
import { userFromRequest } from "@/web/tokens";
import { findCompany } from "./api/company";
import SuperJSON from "superjson";
import { useState } from "react";
import { User, organization } from "@prisma/client";
import Calendar from "@/components/Calendar";
interface Position {
  id: string;
  name: string;
  users: User[];
  organization: company;
}
interface company {
  id: string;
  name: string;
  employees?: User[];
  positions: Position[];
}
interface props {
  user?: User;
  companyInfo: company;
}
export default function Schedule({ companyInfo }: props) {
  // console.log(companyInfo);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  // console.log(selectedPosition);
  const positions = companyInfo.positions.map((position) => {
    // console.log(position.users)
    return { value: position.id, label: position.name };
  });
  // if (selectedPosition != "") {
  // const position = companyInfo.positions.filter((position) => {
  //   return position.id == selectedPosition;
  // });
  const position = companyInfo.positions.find((position) => {
    return position.id == selectedPosition;
  });
  // console.log(position?.users);

  // }
  return (
    <div>
      <select
        defaultValue="Select"
        onChange={(e) => setSelectedPosition(e.target.value)}
      >
        <option value="Select" disabled hidden>
          Select
        </option>
        {positions.map((position) => {
          return (
            <option key={position.value} value={position.value}>
              {position.label}
            </option>
          );
        })}
      </select>
      <Calendar position={position} />
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
