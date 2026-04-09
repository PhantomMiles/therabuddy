"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function SignupPage() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    console.log({name,email,password});
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-6">

      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-xl p-8 space-y-6">

        <div className="flex flex-col items-center space-y-3">
          <Image src="/therabuddy.png" alt="Therabuddy" width={60} height={60}/>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-500 text-center">
            Start your mental wellness journey today.
          </p>
        </div>

        {/* SOCIAL SIGNUP */}

        <div className="space-y-3">

          <button className="flex items-center justify-center gap-3 w-full border rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500"/>
            Sign up with Google
          </button>

          <button className="flex items-center justify-center gap-3 w-full border rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600"/>
            Sign up with Facebook
          </button>

        </div>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex-1 border-t"></div>
          OR
          <div className="flex-1 border-t"></div>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full mt-1 rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black dark:bg-neutral-800"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full mt-1 rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black dark:bg-neutral-800"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="Create password"
              className="w-full mt-1 rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black dark:bg-neutral-800"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-3 font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black dark:text-white">
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}