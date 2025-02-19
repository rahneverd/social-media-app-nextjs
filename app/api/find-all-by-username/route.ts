import { API_ROUTES, Backend_URL } from '@/lib/contants';
import { NextApiResponse } from 'next';

export async function POST(req: any, res: NextApiResponse) {
  console.log('here');
  const reqBody = await req.json();
  console.log('inside route 1: ', reqBody);
  const response: any = await fetch(
    Backend_URL + API_ROUTES.POSTS_MODULE + API_ROUTES.FIND_ALL_BY_USERNAME,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: reqBody?.username
      })
    }
  );

  console.log('inside route 2: ', response);
  // // return response;
  if (!response.ok) {
    const error: any = await response.json();
    console.log('inside error: ', error);
    return Response.json({ error: error[0] });
  } else {
    const resJson = await response.json();
    console.log(resJson);
    return Response.json(resJson);
  }
}

// export async function GET(req: any, res: any) {
//   console.log('Welcome');
// }
