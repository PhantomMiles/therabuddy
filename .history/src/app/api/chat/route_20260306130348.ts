import { runTherabuddyAI } from "@/lib/ai"

export async function POST(req:Request){

 const body = await req.json()

 const reply = await runTherabuddyAI(body.message)

 return Response.json({reply})

}