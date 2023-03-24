import React, { useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import useServerRefresher from "@/hooks/useServerRefresher";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
export default function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async(e: any) => {
    e.preventDefault()
    console.log('here')
    const user = {
      email,
      password
    }
    try{
      const response = await axios.post('/api/sessions', {user})
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div className=" m-auto">
      <form
        onSubmit={handleSubmit}
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
  );
}
