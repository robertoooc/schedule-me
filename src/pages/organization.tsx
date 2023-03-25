import { GetServerSidePropsContext } from "next";
import { User } from "@prisma/client";
import axios from 'redaxios'
import { userFromRequest } from '@/web/tokens';
import SuperJSON from 'superjson';
interface Props {
  user?: User;  
}

export default function Company({ user }: Props){
  console.log(user)
  return(
    <div>
      Register a new Company 
      <form></form>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };

  console.log(user, 'work')
  // Always use superjson as Next.js
  // can't serialize prisma objects by default
  return {
    props: SuperJSON.serialize({
      user,
    }).json,
  };
}