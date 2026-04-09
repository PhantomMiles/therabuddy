"use client";

import { useState } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };
  const session = await getServerSesson();
  if (session){
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-6">

      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-xl p-8 space-y-6">

        <div className="flex flex-col items-center space-y-3">
          <Image src="/therabuddy.png" alt="Therabuddy" width={60} height={60} />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-500 text-center">
            Log in to continue your wellness journey.
          </p>
        </div>

        {/* SOCIAL LOGIN */}

        <div className="space-y-3">

          <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="flex items-center justify-center gap-3 w-full border rounded-lg py-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
            
            {/* Google Icon */}
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.19 3.6l6.85-6.85C35.82 2.46 30.31 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.32 13.21 17.72 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.21-.43-4.73H24v9h12.46c-.54 2.89-2.19 5.33-4.66 6.99l7.18 5.59C43.99 37.05 46.1 31.31 46.1 24.5z"/>
              <path fill="#FBBC05" d="M10.54 28.42c-.5-1.49-.79-3.09-.79-4.92s.29-3.43.79-4.92l-7.98-6.2C.92 16.41 0 20.06 0 24c0 3.94.92 7.59 2.56 10.62l7.98-6.2z"/>
              <path fill="#34A853" d="M24 48c6.31 0 11.62-2.08 15.49-5.66l-7.18-5.59c-2.01 1.35-4.58 2.15-8.31 2.15-6.28 0-11.68-3.71-13.46-9.17l-7.98 6.2C6.51 42.62 14.62 48 24 48z"/>
            </svg>

            Continue with Google
          </button>


        </div>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex-1 border-t"></div>
          OR
          <div className="flex-1 border-t"></div>
        </div>

        {/* EMAIL LOGIN FORM */}

        <form onSubmit={handleSubmit} className="space-y-4">

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
              placeholder="••••••••"
              className="w-full mt-1 rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black dark:bg-neutral-800"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-3 font-medium hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-black dark:text-white">
            Sign up
          </Link>
        </p>

      </div>
    </main>
  );
}