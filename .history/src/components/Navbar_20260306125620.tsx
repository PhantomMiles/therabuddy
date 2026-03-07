"use client"

import Link from "next/link"

export default function Navbar() {
 return (
  <nav className="flex items-center justify-between p-6 bg-white shadow-sm">

   <div className="flex items-center gap-3">

    <img
     src="/therabuddy-icon.png"
     className="w-8 h-8"
    />

    <span className="font-bold text-xl text-blue-600">
     Therabuddy
    </span>

   </div>

   <div className="flex gap-6 text-gray-600">

    <Link href="/dashboard">Dashboard</Link>
    <Link href="/chatbot">Chat</Link>

   </div>

  </nav>
 )
}