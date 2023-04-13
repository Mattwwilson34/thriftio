import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/products', async (req: Request, res: Response): Promise<void> => {
  const cursor = req.query.cursor as string | undefined;
  const take = 10;

  const products = await prisma.products.findMany({
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { uuid: cursor } : undefined,
  });

  const hasNextPage = await prisma.products.count({
    where: {
      uuid: { gt: products[products.length - 1].uuid },
    },
  });

  const nextCursor = hasNextPage ? products[products.length - 1].uuid : null;

  res.json({ products, cursor: nextCursor });
});


router.get('/productIds', async (req: Request, res: Response): Promise<void> => {
  // hit the database and get the product ids
  const productIdsData = await prisma.products.findMany({ select: { uuid: true } });
  // map the data to conver array of objects to array of strings
  const productIds = productIdsData.map((product) => product.uuid);
  // return the product ids
  res.status(200).json(productIds)
})


export default router;
