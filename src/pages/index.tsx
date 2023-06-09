import { Inter } from "next/font/google";
import { GetServerSidePropsContext } from "next";
import { User } from "@prisma/client";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
import SuperJSON from "superjson";
import Session from "@/components/Session";
import Calendar from "@/components/Calendar";

interface Props {
  user?: User;
}

const inter = Inter({ subsets: ["latin"] });
export default function Home({ user }: Props) {
  if (!user) return <Session />;
  console.log(user);
  const handleLogout = async () => {
    try {
      await axios.delete("/api/sessions");
    } catch (err) {
      console.log(err);
    }
  };
  // console.log
  return (
    <main className="max-w-4xl mx-auto py-20 space-y-8">
      Hello {user.name}!
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      {/* <Calendar position={null}/> */}
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };

  console.log(user, "work");
  // Always use superjson as Next.js
  // can't serialize prisma objects by default
  return {
    props: SuperJSON.serialize({
      user,
    }).json,
  };
}
