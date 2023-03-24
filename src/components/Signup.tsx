import React, { useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import useServerRefresher from "@/hooks/useServerRefresher";
import axios from "redaxios";
import { userFromRequest } from "@/web/tokens";
export default function SignUp() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name,setName]= useState<string>('')
  const handleSubmit = async(e: any) => {
    e.preventDefault()
    console.log('here')
    const user = {
      email,
      name,
      password
    }
    try{
      const response = await axios.post('/api/users', {user})
      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div className=" m-auto">

                <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-zinc-800 p-8 px-8 rounded-lg'>
                    <h2 className="text-4xl dark:text-white font-bold text-center">Register</h2>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label htmlFor="name">Name: </label>
                        <input
                            autoComplete='off'
                            id='name'
                            onChange={e=> setName(e.target.value)}
                            value={name}
                            required
                            className="rounded-lg text-black"
                            />
                    </div>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label htmlFor="email">Email: </label>
                        <input
                            autoComplete='off'
                            id='email'
                            onChange={e=> setEmail(e.target.value)}
                            value={email}
                            required
                            className="rounded-lg text-black"
                            />
                    </div>
                    <div className="flex flex-col text-gray-400 py-2">
                        <label htmlFor="password">Password: </label>
                        <input
                            autoComplete='off'
                            id='password'
                            type='password'
                            onChange={e=> setPassword(e.target.value)}
                            value={password}
                            required
                            className="rounded-lg text-black"
                            />
                    </div>
                    <button type="submit" className="w-full my-5 py-2 bg-zinc-700 text-white font-semibold rounded-lg">Submit</button>
                </form>
                <p className='text-center text-red-600 mt-2'>{message}</p>
        </div>
  );
}
