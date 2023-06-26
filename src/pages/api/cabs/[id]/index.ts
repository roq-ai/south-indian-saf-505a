import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cabValidationSchema } from 'validationSchema/cabs';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cab
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCabById();
    case 'PUT':
      return updateCabById();
    case 'DELETE':
      return deleteCabById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCabById() {
    const data = await prisma.cab.findFirst(convertQueryToPrismaUtil(req.query, 'cab'));
    return res.status(200).json(data);
  }

  async function updateCabById() {
    await cabValidationSchema.validate(req.body);
    const data = await prisma.cab.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCabById() {
    const data = await prisma.cab.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
