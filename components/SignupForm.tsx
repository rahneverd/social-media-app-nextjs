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
import { APIROUTES, Backend_URL } from '@/lib/contants';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

export default function SignupForm() {
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
      email: '',
      username: '',
      password: ''
    }
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // const response: any = await signIn('credentials', {
      //   email: values.email,
      //   username: values?.username,
      //   password: values?.password,
      //   redirect: false
      // });
      // if (!response.ok) {
      //   throw new Error(response.error);
      // }
      // router.push('/dashboard');
      const signupResponse: any = await fetch(
        Backend_URL + APIROUTES.REGISTER,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: values?.email,
            username: values?.username,
            password: values?.password
          })
        }
      );
      if (!signupResponse.ok) {
        const error: any = await signupResponse.json();
        console.log(error);
        throw new Error(error);
      } else {
        const response: any = await signIn('credentials', {
          username: values?.username,
          password: values?.password,
          redirect: false
        });
        if (!response.ok) {
          throw new Error(response.error);
        }
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Registration Failed',
        description: error.message ? error.message : error?.error
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="abc@xyz.xom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Register
          </Button>
        </form>
      </Form>

      <Button
        className="mt-4 w-full"
        variant={'secondary'}
        onClick={() => router.push('/login')}
      >
        Already have an account?
      </Button>
    </>
  );
}
