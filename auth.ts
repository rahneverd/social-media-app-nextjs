// import { CredentialsProvider } from './node_modules/next-auth/src/providers/credentials';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import prisma from '@/lib/prisma';
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import { API_ROUTES, Backend_URL } from '@/lib/contants';

const loggedIn: boolean = false;

export const config = {
  pages: {
    signIn: '/login'
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentils',
      credentials: {
        username: {
          label: 'Username',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentils, req) {
        if (!credentils?.username || !credentils?.password) {
          return null;
        }
        const { username, password } = credentils;
        const res = await fetch(Backend_URL + API_ROUTES.LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (res.status === 200) {
          const user = await res.json();
          console.log(user?.token);
          return {
            id: user._id,
            email: user.email,
            username: user.username,
            name: user.username,
            picture: user.picture,
            token: user.token
          };
        } else {
          const error: any = await res.json();
          throw new Error(error);
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      console.log('session callback');
      if (token) {
        session.user.username = token.username;
        session.user.token = token.token;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      // console.log(session);
      return session;
    },
    async jwt({ token, user }) {
      console.log('jwt callback');
      if (user) {
        console.log('inside with user here');
        console.log(user?.token);
        const newUser = await fetch(Backend_URL + 'refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: user?.token
          })
        });
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
        token.username = user?.username;
        token.picture = user?.picture;
        token.token = user.token;
      }
      // console.log(token);
      // if (user) {

      // }
      return token;
    }
  },
  secret: 'MySecret'
} satisfies NextAuthOptions;

export default NextAuth(config);

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
