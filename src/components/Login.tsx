import React from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import useServerRefresher from "@/hooks/useServerRefresher";
import axios from 'redaxios'
export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const {
    isLoading,
    isError,
    mutate: loginMutation,
  } = useMutation(params => axios.post("/sessions", params), {
    onSuccess: useServerRefresher(),
  });

  const onSubmit = async (params:any) => loginMutation(params);

  return (
    <form
      className="h-screen u-center flex flex-col items-center space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Head>
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
          </a> */}
          sign up
        </Link>
      </div>
    </form>
  );
}