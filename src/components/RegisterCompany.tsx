import { GetServerSidePropsContext } from "next";
import { User, organization } from "@prisma/client";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
import React, { useState } from "react";
import SuperJSON from "superjson";
interface Props {
  user?: User;
}

export default function RegisterCompany({ user }: Props) {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const response = await axios.post("/api/company", { companyName: name });
      console.log(response.data);
      console.log(user);
      // const test = async (context:GetServerSidePropsContext)=>{
      //   const updateUser = await userFromRequest(context.req)
      //   console.log(updateUser)
      // }
      // const response = await axios.put('/api/company', {companyId: name})
      //  const response = await axios.post('/api/position', {companyId: name,positionName:'test'})
      //  const response = await axios.get('/api/position', {companyId: name,positionName:'test'})
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user)
  return (
    <div>
      <form
        className="max-w-fit max-h-fit mx-auto bg-zinc-800 p-8 px-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl dark:text-white font-bold text-center">
          Register a Company
        </h2>

        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="name">Name: </label>
          <input
            autoComplete="off"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="rounded-lg text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full my-5 py-2 bg-zinc-700 text-white font-semibold rounded-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const user = await userFromRequest(context.req);

//   if (!user) return { props: {} };

//   // console.log(user, 'work')
//   // Always use superjson as Next.js
//   // can't serialize prisma objects by default
//   return {
//     props: SuperJSON.serialize({
//       user,
//     }).json,
//   };
// }
