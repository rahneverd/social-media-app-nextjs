import { APIROUTES, Backend_URL } from '@/lib/contants';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
// import { NextResponse } from 'next/server';

export async function POST(
  req: Request & {
    body: { email: string; password: string; username: string };
  },
  res: NextApiResponse
) {
  console.log(req);
  const reqBody = await req.json();
  console.log(reqBody);
  const response: any = await fetch(Backend_URL + APIROUTES.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: reqBody?.email,
      username: reqBody?.username,
      password: reqBody?.password
    })
  });
  // // return response;
  if (!response.ok) {
    const error: any = await response.json();
    return Response.json({ error: error[0] });
  } else {
    const resJson = await response.json();
    return Response.json(resJson);
  }
}
