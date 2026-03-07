import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma"

export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_ID!,
   clientSecret: process.env.GOOGLE_SECRET!,
  }),

  FacebookProvider({
   clientId: process.env.FACEBOOK_ID!,
   clientSecret: process.env.FACEBOOK_SECRET!,
  }),

  CredentialsProvider({
   name: "Credentials",
   credentials: {
    email: {},
    password: {},
   },

   async authorize(credentials) {
    const user = await prisma.user.findUnique({
     where: { email: credentials.email }
    })

    if (!user) return null
    return user
   },
  }),
 ],
}