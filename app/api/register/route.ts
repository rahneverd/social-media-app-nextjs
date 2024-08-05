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
  const response: any = await fetch(Backend_URL + APIROUTES.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: req?.body?.email,
      username: req?.body?.username,
      password: req?.body?.password
    })
  });
  // // return response;
  if (!response.ok) {
    const error: any = await response.json();
    // let errorsObj = {
    //   errors: response.errors
    // };
    // throw new Error(error);
    // return Response.json({ errors: error });
    // Response.json(error).error()
    // res.status(400).json(error);
    // return new NextApiResponse()
    return Response.json({ error: error[0] });
    // return new NextResponse(error, {
    //   status: 400
    // });
    // return NextResponse.status();
  } else {
    return Response.json(response);
  }
}
