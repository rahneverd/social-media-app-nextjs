import type { Session, User } from 'next-auth';
import type { JWT } from '@auth/core/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    // id: string;
    username?: string | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      username?: string | null;
      avatar?: string | null | any;
      token?: string | null | any;
    };
  }

  interface User {
    username?: string | null;
  }
}
