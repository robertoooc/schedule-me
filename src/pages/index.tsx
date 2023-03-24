import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSidePropsContext } from "next";
import { User } from "@prisma/client";
import axios from 'redaxios'
import { userFromRequest } from '@/web/tokens';
import SuperJSON from 'superjson';
import Session from '@/components/Session';

interface Props {
  user?: User;  
}

const inter = Inter({ subsets: ['latin'] })
export default function Home({ user }: Props) {
  if (!user) return <Session/>;
  console.log(user)
  const handleLogout = async () => {
    try{
      await axios.delete("/api/sessions");
    }catch(err){
      console.log(err)
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-20 space-y-8">
      Hello {user.name}!

      <button type="button" onClick={handleLogout}>Logout</button>
    </main>
  );
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