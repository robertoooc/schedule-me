import { GetServerSidePropsContext } from "next";
import { userFromRequest } from "@/web/tokens";
import { findCompany } from "./api/company";
import SuperJSON from "superjson";
import { useRouter } from "next/router";
import { getPositionInfo } from "./api/position";
export default function Position(){
  const router = useRouter()
  const {id} = router.query
  // console.log(id)
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);
  const {id} = context.query
  console.log(id,'🐙')

  if (!user) return { props: {} };

  const companyInfo = await findCompany(user);
  if(id == null || id == undefined || Array.isArray(id)) return {props:{}}
  const positionInfo = await getPositionInfo(id)
  console.log(positionInfo)
  // const positionInfo = companyInfo?.positions.find(position => position.id == id)
  // console.log(positionInfo,'🥶')
  return {
    props: SuperJSON.serialize({
      user,
      companyInfo,
    }).json,
  };
}