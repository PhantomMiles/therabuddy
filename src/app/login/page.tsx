import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginClient from "./LoginClient";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    const role = (session.user as any).role;
    redirect(role === "therapist" ? "/therapist" : "/dashboard");
  }
  return <LoginClient />;
}
