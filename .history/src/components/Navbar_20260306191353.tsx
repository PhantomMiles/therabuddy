"use client"

import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
 return (
  <nav className="flex items-center justify-between p-6 bg-white shadow-sm">

   <div className="flex items-center gap-3">

    <Image
     src="/logo.png"
     className="w-8 h-8"
     alt="Therabuddy icon"
    />

    <span className="font-bold text-xl text-blue-600 flex items-center gap-1">
     <FontAwesomeIcon icon={faBrain} /> Therabuddy
    </span>

   </div>

   <div className="flex gap-6 text-gray-600">

    <Link href="/dashboard"><FontAwesomeIcon icon={faBrain} /> Dashboard</Link>
    <Link href="/chatbot"><FontAwesomeIcon icon={faPaperPlane} /> Chat</Link>
    <Link href="/login">Login</Link>
    <Link href="/signup">Signup</Link>
   </div>

  </nav>
 )
}