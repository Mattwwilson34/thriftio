import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/products', async (req: Request, res: Response): Promise<void> => {
  // query db for products limit to 10
  const products = await prisma.products.findMany({ take: 10 });

  res.send(JSON.stringify(products));
});

export default router;
