"use client";

import Image from "next/image"
import { signIn } from "next-auth/react"

export default function LoginPage(){

 return(

  <div className="h-screen flex items-center justify-center bg-gray-50">

   <div className="medical-card w-96 space-y-6 text-center">

    <Image
     src="/therabuddy.png"
     alt="Therabuddy"
     width={120}
     height={120}
     className="mx-auto"
    />

    <h1 className="text-2xl font-bold text-blue-600">
     Welcome to Therabuddy
    </h1>

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