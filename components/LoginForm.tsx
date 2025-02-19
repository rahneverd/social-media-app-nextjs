'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { calSans } from '@/app/fonts';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

export default function LoginForm() {
  return (
    <div className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${calSans.className} mb-3 text-2xl dark:text-black`}>
          Please log in to continue.
        </h1>
        <CredebtialsForm />
      </div>
    </div>
  );
}

function CredebtialsForm() {
  // const { pending } = useFormStatus();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response: any = await signIn('credentials', {
        username: values?.username,
        password: values?.password,
        redirect: false
      });
      if (!response.ok) {
        throw new Error(response.error);
      }
      router.push('/dashboard');
    } catch (error: any) {
      toast({ title: 'Login Failed', description: error.message });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full" variant={'secondary'}>
            Log In
          </Button>
        </form>
      </Form>

      <Button
        className="mt-4 w-full"
        variant={'secondary'}
        onClick={() => router.push('/signup')}
      >
        Create an account
      </Button>
    </>
  );
}
