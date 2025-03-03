import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import dbConnect from "@/lib/db";
import User from "../../../models/User";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          await dbConnect(); // Ensure DB connection

          const user = await User.findOne({ email: credentials.email });

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          const isCorrectPassword = await compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error("Incorrect password");
          }

          console.log("✅ Authentication successful for:", user.email);
          return user;
        } catch (error: any) {
          console.error("❌ Authentication error:", error.message);
          throw new Error(
            "Authentication failed. Please check your credentials."
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: true, // Enable debug logs
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
