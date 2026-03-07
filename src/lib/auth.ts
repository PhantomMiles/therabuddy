export async function runTherabuddyAI(message: string) {

 const response = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: {
   "Content-Type": "application/json"
  },
  body: JSON.stringify({
   model: "llama3",
   prompt: `
You are Therabuddy, an AI mental health assistant.

Goals:
- provide emotional support
- detect anxiety, depression signals
- recommend coping exercises
- encourage professional help if necessary

User message:
${message}
`
  })
 })

 const data = await response.json()

 return data.response
}