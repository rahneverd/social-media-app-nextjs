import { NextApiResponse } from 'next';

export async function POST(
  req: Request & {
    body: { body: string; image?: string };
  },
  res: NextApiResponse
) {}
