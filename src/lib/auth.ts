import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // For OAuth users, ensure they have a role set
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser && !existingUser.role) {
        await prisma.user.update({
          where: { email: user.email },
          data: { role: "patient" },
        });
      }

      // Auto-create user record for first-time Google sign-ins
      if (!existingUser && user.email) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name ?? "",
            role: "patient",
          },
        });
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.image = (user as any).image;
      }
      
      // Update token if session is updated (client-side update)
      if (trigger === "update" && session?.image) {
        token.image = session.image;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      // Refresh from DB if missing or to stay fresh
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, image: true, name: true }
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.image = dbUser.image;
          token.name = dbUser.name;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        session.user.image = token.image as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};