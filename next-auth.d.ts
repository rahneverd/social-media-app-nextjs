import type { Session, User } from 'next-auth';
import type { JWT } from '@auth/core/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
    username?: string | null;
    email?: string | null;
    token?: string | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface User {
    username?: string | null;
    picture?: string | null | any;
    token?: string | null | any;
    id?: string | null | any;
  }
}
