import { GetServerSidePropsContext } from "next";
import { User } from "@prisma/client";
import axios from 'redaxios'
import { userFromRequest } from '@/web/tokens';
import React, { useState } from "react";
import SuperJSON from 'superjson';
import RegisterCompany from "@/components/RegisterCompany";
interface Props {
  user?: User;  
}

export default function Company({ user }: Props){
  const [name,setName]=useState<string>('')
  // console.log(user)

  const handleSubmit = async(e:any)=>{
    try{
      e.preventDefault()
      
      // const response = await axios.post('/api/company', {companyName: name})
      // const response = await axios.put('/api/company', {companyId: name})
      //  const response = await axios.post('/api/position', {companyId: name,positionName:'test'})
       const response = await axios.put('/api/position', {positionId: name,newUserToAdd:'c4fd01c9-45e8-4599-8ed7-ee1a06ba4294'})
      //  const response = await axios.get('/api/position', {companyId: name,positionName:'test'})

    }catch(err){
      console.log(err)
    }
  }
  // console.log(user)
  return(
    <div>

    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };
  
  const companyId = user.organizationId
  if(!companyId)   return {
    props: SuperJSON.serialize({
      user,
    }).json,
  };

  console.log(user.organizationId)

  // const company = await axios.get('/api/company',companyId)
  try{


    const company = await axios.get('http://localhost:3000/api/company')
    console.log(company)
  }catch(err){
    console.log(err)
  }
  // console.log(user, 'work')
  // Always use superjson as Next.js
  // can't serialize prisma objects by default
  return {
    props: SuperJSON.serialize({
      user,
    }).json,
  };
}