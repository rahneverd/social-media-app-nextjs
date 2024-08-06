import { API_ROUTES, Backend_URL } from '@/lib/contants';
import { NextApiResponse } from 'next';
import { auth } from '@/auth';

export async function POST(req: any, res: NextApiResponse) {
  const session = await auth();
  const token = session?.user?.token;
  // const body = JSON.stringify({
  //   token: token
  // });
  // console.log(body);

  const data = await req.formData();
  const file = data.get('file');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('token', token);

  console.log('FormData entries:');
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}: ${pair[1]}`);
  // }

  const response: any = await fetch(
    Backend_URL + API_ROUTES.POSTS_MODULE + API_ROUTES.UPLOAD,
    {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      body: formData
    }
  );
  console.log(file);
  // // return response;
  if (!response.ok) {
    const error: any = await response.json();
    console.log(error);
    return Response.json({ error: error[0] });
  } else {
    const resJson = await response.json();
    return Response.json(resJson);
  }
}
