'use client';

// import { calSans } from "@/app/fonts";
import { signIn } from 'next-auth/react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { calSans } from '@/app/fonts';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

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
        {/* <LoginButton /> */}
      </div>
    </div>
  );
}

// function LoginButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button
//       className="mt-4 w-full"
//       variant={'secondary'}
//       aria-disabled={pending}
//       onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
//     >
//       Log in with Google
//     </Button>
//   );
// }

function CredebtialsForm() {
  const { pending } = useFormStatus();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // signIn('credentils', {
    //   callbackUrl: '/dashboard',
    //   username: values?.username,
    //   password: values?.password
    // });
    try {
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     username: values.username,
      //     password: values.password
      //   })
      // });
      const response: any = await signIn('credentials', {
        username: values?.username,
        password: values?.password,
        redirect: false
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(response.error);
      }
      // Process response here
      // console.log('Registration Successful', response);
      toast({ title: 'Registration Successful' });
    } catch (error: any) {
      console.error('Registration Failed:', error);
      toast({ title: 'Registration Failed', description: error.message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
