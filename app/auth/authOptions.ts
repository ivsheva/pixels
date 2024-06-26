import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {
          label: "Email or Username",
          type: "text",
          placeholder: "Login",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, request) {
        if (!credentials?.login || !credentials.password) return null;

        // arrange global user variable to assign it in two places
        let user;

        // check if login is email and find a user by email
        if (credentials.login.includes("@")) {
          user = await prisma.user.findUnique({
            where: { email: credentials.login },
          });
        }

        // find user by username if its not an email
        else {
          user = await prisma.user.findUnique({
            where: {
              username: credentials.login,
            },
          });
        }

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (!passwordsMatch) return null;

        return user; // success
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session.name) token.name = session.name;
        if (session.username) token.username = session.username;
        if (session.image) token.image = session.image;
      }

      if (user) token.user = user;

      return token;
    },
    async session({ session, token }) {
      if (token && token.user) session.user = token.user as User;

      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

export default authOptions;
