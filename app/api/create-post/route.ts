import { APIROUTES, Backend_URL } from '@/lib/contants';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
// import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(req: any, res: NextApiResponse) {
  const session = await auth();
  const user = session?.user;
  console.log(req);
  const reqBody = await req.json();
  console.log(reqBody);
  const response: any = await fetch(
    Backend_URL + APIROUTES.POSTS_MODULE + APIROUTES.CREATE_POST,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: reqBody?.image,
        caption: reqBody?.caption,
        token: user?.token
      })
    }
  );
  // // return response;
  if (!response.ok) {
    const error: any = await response.json();
    return Response.json({ error: error[0] });
  } else {
    const resJson = await response.json();
    console.log(resJson);
    return Response.json(resJson);
  }
}
