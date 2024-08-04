import { auth } from '@/auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  // if (!session?.user) {
  //   redirect('/login');
  // } else
  redirect('/dashboard');
}
