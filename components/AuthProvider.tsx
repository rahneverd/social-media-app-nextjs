'use client';

import { SessionProvider } from 'next-auth/react';

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider refetchInterval={1500}>{children}</SessionProvider>;
}

export default AuthProvider;
