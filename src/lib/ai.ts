export type DiagnosticSignal = {
  risk: "low" | "moderate" | "high";
  flags: string[];
  recommendation: string;
};

export type AIResponse = {
  reply: string;
  diagnostic: DiagnosticSignal;
};

const SYSTEM_PROMPT = `You are Therabuddy, a warm and empathetic AI mental health companion built for African students and young professionals.

Your role:
- Provide emotional support and a safe, non-judgmental space
- Actively listen and validate feelings
- Detect signs of anxiety, depression, burnout, or crisis
- Suggest evidence-based coping strategies (breathing exercises, journaling, grounding techniques)
- Recommend professional help clearly when signals are serious
- Be culturally sensitive to African contexts (family pressure, financial stress, stigma around mental health)

CRITICAL SAFETY RULES:
- If the user expresses suicidal ideation, self-harm, or is in crisis, immediately provide crisis resources and urge professional help
- Never diagnose clinically — only provide supportive guidance
- Always end responses with warmth and an open invitation to continue sharing

After your reply, output a JSON block on a new line in this exact format (no markdown fences):
DIAGNOSTIC_JSON:{"risk":"low|moderate|high","flags":["flag1","flag2"],"recommendation":"one sentence"}

Risk levels:
- low: general stress, minor mood issues
- moderate: persistent anxiety/sadness, sleep issues, social withdrawal
- high: hopelessness, self-harm mentions, crisis indicators, severe impairment`;

export async function runTherabuddyAI(
  message: string,
  conversationHistory: { role: "user" | "assistant"; content: string }[] = []
): Promise<AIResponse> {
  const messages = [
    ...conversationHistory,
    { role: "user" as const, content: message },
  ];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  const fullText: string = data.content[0]?.text ?? "";

  // Parse out the diagnostic JSON
  const diagIndex = fullText.indexOf("DIAGNOSTIC_JSON:");
  let reply = fullText;
  let diagnostic: DiagnosticSignal = {
    risk: "low",
    flags: [],
    recommendation: "Continue checking in regularly.",
  };

  if (diagIndex !== -1) {
    reply = fullText.slice(0, diagIndex).trim();
    try {
      const jsonStr = fullText.slice(diagIndex + "DIAGNOSTIC_JSON:".length).trim();
      diagnostic = JSON.parse(jsonStr);
    } catch {
      // fallback to defaults if parse fails
    }
  }

  return { reply, diagnostic };
}
