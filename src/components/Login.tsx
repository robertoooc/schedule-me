import React, { useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import useServerRefresher from "@/hooks/useServerRefresher";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
export default function Login() {
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm();
  // const {
  //   isLoading,
  //   isError,
  //   mutate: loginMutation,
  // } = useMutation(params => axios.post("/sessions", params), {
  //   onSuccess: useServerRefresher(),
  // });

  // const onSubmit = async (params:any) => loginMutation(params);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async(e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    // const users = await userFromRequest(context.req);
    console.log('here')
    const user = {
      email,
      password
    }
    const response = await axios.post('/api/sessions', {user})
    console.log(response.data)
  };

  return (
    <div className=" m-auto">
      <form
        onSubmit={()=>handleSubmit}
        className="max-w-[400px] w-full mx-auto bg-zinc-800 p-8 px-8 rounded-lg"
      >
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="email">Email: </label>
          <input
            autoComplete="off"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            className="rounded-lg text-black"
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="password">Password: </label>
          <input
            autoComplete="off"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="rounded-lg text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full my-5 py-2 bg-zinc-700 text-white font-semibold rounded-lg"
        >
          Login
        </button>
      </form>
      <p className="text-center text-red-600 mt-2">{message}</p>
    </div>
    // <form
    //   className="h-screen u-center flex flex-col items-center space-y-8"
    //   onSubmit={handleSubmit(onSubmit)}
    // >
    /* <Head>
        <title>Login</title>
      </Head>

      <div className="space-y-8">
        <h1 className="self-start text-xl">Login</h1>

        <label className="flex flex-col" htmlFor="email">
          Email
          <input type="text" {...register("email", { required: true })} />
        </label>

        <label className="flex flex-col" htmlFor="password">
          Password
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </label>

        <button
          className="u-button"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading}
        >
          Login
        </button>

        {isError && <p>User password combination not found</p>}

        <Link href="/signup">
          {/* <a className="block underline" href="/signup">
            Sign up
          </a> */
    //       sign up
    //     </Link>
    //   </div> */}
    // </form>
  );
}
