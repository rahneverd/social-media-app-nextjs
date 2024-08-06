'use client';

import { SessionProvider } from 'next-auth/react';

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider refetchInterval={10}>{children}</SessionProvider>;
}

export default AuthProvider;
