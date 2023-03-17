import connectDB from "../../../lib/database"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import { generateHashedPassword } from "../../../utils/encryption";

function validateUser(password, user) {
  const currentHashedPassword = generateHashedPassword(user.salt, password);
  return currentHashedPassword == user.hashedPassword;
}

const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectDB();
        const username = credentials.username;
        const password = credentials.password;
        const user = await User.findOne({ username });

        if (!user || !validateUser(password, user)) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);