"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignupPage(){

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [loading,setLoading] = useState(false)

 async function handleSignup(e:any){

  e.preventDefault()

  setLoading(true)

  const res = await fetch("/api/auth/register",{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body: JSON.stringify({
    name,
    email,
    password
   })
  })

  if(res.ok){

   await signIn("credentials",{
    email,
    password,
    redirect:true,
    callbackUrl:"/dashboard"
   })

  }

  setLoading(false)
 }

 return(

  <div className="h-screen flex items-center justify-center bg-gray-50">

   <div className="medical-card w-96 space-y-6">

    <div className="text-center">

     <Image
      src="/therabuddy.png"
      width={110}
      height={110}
      alt="Therabuddy"
      className="mx-auto"
     />

     <h1 className="text-2xl font-bold text-blue-600 mt-3">
      Create your account
     </h1>

    </div>

    <form
     onSubmit={handleSignup}
     className="space-y-4"
    >

     <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className="border rounded-lg p-3 w-full"
     />

     <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="border rounded-lg p-3 w-full"
     />

     <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="border rounded-lg p-3 w-full"
     />

     <button
      className="primary-btn w-full"
      disabled={loading}
     >
      {loading ? "Creating account..." : "Sign Up"}
     </button>

    </form>

    <div className="text-center text-gray-500">
     or
    </div>

    <button
     onClick={()=>signIn("google")}
     className="primary-btn w-full"
    >
     Continue with Google
    </button>

    <button
     onClick={()=>signIn("facebook")}
     className="primary-btn w-full"
    >
     Continue with Facebook
    </button>

   </div>

  </div>

 )
}