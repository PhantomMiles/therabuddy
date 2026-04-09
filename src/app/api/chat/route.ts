import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { runTherabuddyAI } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Fetch recent conversation history (last 10 messages for context)
    const history = await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    const conversationHistory = history.map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.content,
    }));

    // Run AI with context
    const { reply, diagnostic } = await runTherabuddyAI(message, conversationHistory);

    // Save both messages
    await prisma.message.createMany({
      data: [
        { content: message, role: "user", userId },
        { content: reply, role: "ai", userId },
      ],
    });

    // Save diagnostic result
    await prisma.diagnosticLog.create({
      data: {
        userId,
        risk: diagnostic.risk,
        flags: diagnostic.flags,
        recommendation: diagnostic.recommendation,
      },
    });

    return NextResponse.json({ reply, diagnostic });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
