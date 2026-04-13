import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { answers } = await req.json();

  const riskScores: Record<string, number> = {
    "Very Good": 0, "Okay": 1, "Low / Sad": 2, "Hopeless": 3,
    "Sleeping well": 0, "Slightly disrupted": 1, "Poor sleep": 2, "Can't sleep at all": 3,
    "Yes, fully": 0, "Somewhat": 1, "Barely": 2, "Not at all": 3,
    "High energy": 0, "Normal": 1, "Often tired": 2, "Exhausted": 3,
    "Never": 0, "Occasionally": 1, "Often": 2, "Almost constantly": 3,
  };

  const totalScore = Object.values(answers).reduce(
    (sum: number, answer) => sum + (riskScores[answer as string] ?? 0), 0
  );

  let risk: "low" | "moderate" | "high";
  let summary: string;
  let recommendation: string;

  if (totalScore <= 4) {
    risk = "low";
    summary = "You seem to be managing well overall. Keep up the self-care habits!";
    recommendation = "Continue your daily routines. Consider weekly check-ins to maintain your mental wellness.";
  } else if (totalScore <= 9) {
    risk = "moderate";
    summary = "You're showing some signs of stress or emotional difficulty. This is common and manageable.";
    recommendation = "Try daily breathing exercises or journaling. Consider talking to a counselor or using the chat feature for support.";
  } else {
    risk = "high";
    summary = "Your responses suggest you may be experiencing significant distress. Please know you're not alone.";
    recommendation = "We strongly encourage you to speak with a mental health professional. If you're in crisis, please contact a helpline immediately.";
  }

  const userId = (session.user as any).id;
  if (userId) {
    await prisma.diagnosticLog.create({
      data: {
        userId,
        risk,
        flags: JSON.stringify(Object.values(answers)), // SQLite: store as JSON string
        recommendation,
      },
    });
  }

  return NextResponse.json({ risk, summary, recommendation });
}