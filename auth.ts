// import { CredentialsProvider } from './node_modules/next-auth/src/providers/credentials';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import prisma from '@/lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import { Backend_URL } from '@/lib/contants';

export const config = {
  pages: {
    signIn: '/login'
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
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
        const res = await fetch(Backend_URL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (res.status === 200) {
          const user = await res.json();
          return user;
        } else {
          const error: any = await res.json();
          throw new Error(error);
        }
        // console.log(res);
        // return res;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      // if (token) {
      //   session.user.id = token.id;
      //   session.user.name = token.name;
      //   session.user.email = token.email;
      //   session.user.image = token.picture;
      //   session.user.username = token.username;
      // }

      if (token) {
        session.user.avatar = token.avatar;
        session.user.username = token.name;
        session.user.token = token.token;
      }

      return session;
    },
    async jwt({ token, user }) {
      // const prismaUser: any = null;
      //  = await prisma.user.findFirst({
      //   where: {
      //     email: token.email
      //   }
      // });

      // if (!prismaUser) {
      //   token.id = user.id;
      //   return token;
      // }
      // if (!prismaUser?.username) {
      // await prisma.user.update({
      //   where: {
      //     id: prismaUser.id
      //   },
      //   data: {
      //     username: prismaUser.name?.split(' ').join('').toLowerCase()
      //   }
      // });
      // }

      // return {
      //   id: prismaUser.id,
      //   name: prismaUser.name,
      //   email: prismaUser.email,
      //   username: prismaUser.username,
      //   picture: prismaUser.image
      // };
      return token;
    }
  }
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
