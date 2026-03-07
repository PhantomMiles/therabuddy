export async function runTherabuddyAI(message:string){

 const response = await fetch(
  "http://localhost:11434/api/generate",
  {
   method:"POST",
   headers:{ "Content-Type":"application/json"},
   body:JSON.stringify({
    model:"llama3",
    prompt:`
You are Therabuddy, an empathetic mental health assistant.

User message:
${message}
`
   })
  }
 )

 const data = await response.json()

 return data.response
}