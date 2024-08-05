import { APIROUTES, Backend_URL } from '@/lib/contants';
import { NextApiResponse } from 'next';

export async function POST(req: any, res: NextApiResponse) {
  const data = await req.formData();
  const file = data.get('file');
  const formData = new FormData();
  formData.append('file', file);
  const response: any = await fetch(Backend_URL + APIROUTES.UPLOAD, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    body: formData
  });
  console.log(file);
  // // return response;
  if (!response.ok) {
    const error: any = await response.json();
    return Response.json({ error: error[0] });
  } else {
    const resJson = await response.json();
    return Response.json(resJson);
  }
}
