// pages/api/post/index.ts

import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
const handle: NextApiHandler = async (req, res) => {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.feedback.create({
    data: {
      title: title,
      content: content,
      user: { connect: { email: session?.user?.email! } },
    },
  });
  res.json(result);
};
export default handle;
