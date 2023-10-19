import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      'https://api.huddle01.com/api/v1/create-room',
      {
        title: 'Huddle01-Test',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_HUDDLE_API_KEY,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
