import { prisma } from "@/lib/prisma"
import { runTherabuddyAI } from "@/lib/ai"

export async function POST(req:Request){

 const body = await req.json()

 const aiReply = await runTherabuddyAI(body.message)

 await prisma.message.create({
  data:{
   content:body.message,
   role:"user",
   userId:body.userId
  }
 })

 await prisma.message.create({
  data:{
   content:aiReply,
   role:"ai",
   userId:body.userId
  }
 })

 return Response.json({ reply:aiReply })

}