import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { mood } = await req.json();
  const userId = (session.user as any).id;

  await prisma.moodLog.create({
    data: { mood, userId },
  });

  return NextResponse.json({ success: true });
}
