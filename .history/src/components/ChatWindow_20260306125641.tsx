"use client"

import { useState } from "react"

export default function ChatWindow() {

 const [messages,setMessages] = useState<any[]>([])
 const [input,setInput] = useState("")

 async function sendMessage(){

  const res = await fetch("/api/chat",{
   method:"POST",
   headers:{ "Content-Type":"application/json"},
   body:JSON.stringify({message:input})
  })

  const data = await res.json()

  setMessages([
   ...messages,
   {role:"user",content:input},
   {role:"ai",content:data.reply}
  ])

  setInput("")
 }

 return (

  <div className="medical-card h-[500px] flex flex-col">

   <div className="flex-1 overflow-y-auto space-y-3">

    {messages.map((m,i)=>(
     <div key={i}>

      <div className={
       m.role==="user"
       ? "text-right text-blue-600"
       : "text-left text-gray-700"
      }>
       {m.content}
      </div>

     </div>
    ))}

   </div>

   <div className="flex gap-2 mt-4">

    <input
     value={input}
     onChange={(e)=>setInput(e.target.value)}
     className="border rounded-lg p-2 w-full"
     placeholder="Tell me how you're feeling..."
    />

    <button
     onClick={sendMessage}
     className="primary-btn"
    >
     Send
    </button>

   </div>

  </div>
 )
}