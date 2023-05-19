import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

interface SessionRequest extends Request {
  session: any; // replace `any` with the type definition of your session object
}

const prisma = new PrismaClient();
const router = express.Router();

// get 10 products paginated with cursor
router.get(
  '/products',
  async (req: SessionRequest, res: Response): Promise<void> => {
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
  }
);

// get array of all product uuids
router.get(
  '/productIds',
  async (req: Request, res: Response): Promise<void> => {
    // hit the database and get the product ids
    const productIdsData = await prisma.products.findMany({
      select: { uuid: true },
    });
    // map the data to conver array of objects to array of strings
    const productIds = productIdsData.map((product) => product.uuid);
    // return the product ids
    res.status(200).json(productIds);
  }
);

// get product by uuid
router.get(
  '/product/:productId',
  async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;
    const productData = await prisma.products.findUnique({
      where: {
        uuid: productId,
      },
    });
    res.send(productData);
  }
);

router.post(
  '/shopping-cart-session-update',
  (req: SessionRequest, res: Response): void => {
    req.session.shoppingCart = req.body;
    console.log(req.session);
    res.send(JSON.stringify('ok from shopping-cart'));
  }
);

router.get('/cart', (req: SessionRequest, res: Response): void => {
  if (!req.session.shoppingCart) {
    req.session.shoppingCart = [];
  }
  res.send(JSON.stringify(req.session.shoppingCart));
});

router.get('/sessions', (req: any, res) => {
  req.sessionStore.all((err, sessions) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error getting sessions');
    }
    console.log(sessions);
    res.send('Sessions logged to console');
  });
});

// product search endpoints
router.get(
  '/product-search',
  async (req: SessionRequest, res: Response): Promise<void> => {
    let searchTerm: string = '';

    // update search term if it exists
    if (req.query.search) {
      searchTerm = req.query.search as string;
    }

    try {
      // query database based on search term
      const response = await prisma.products.findMany({
        where: {
          name: {
            contains: searchTerm,
          },
        },
        select: {
          uuid: true,
          name: true,
        },
      });

      // create copy of response to sort
      const responseCopy = [...response];

      // filter results based on on substring
      // prioritize results that start with the substring
      const sortedResults = responseCopy.sort((a, b) => {
        const lowerA = a.name ? a.name.toLowerCase() : '';
        const lowerB = b.name ? b.name.toLowerCase() : '';

        if (lowerA.startsWith(searchTerm.toLowerCase())) {
          return -1; // Substring found at the beginning, prioritize
        } else if (lowerB.startsWith(searchTerm.toLowerCase())) {
          return 1; // Substring found at the beginning, prioritize
        } else {
          return 0; // Substring found elsewhere or not found in both
        }
      });

      // return prisma query response if no error
      res.send(JSON.stringify(sortedResults));
    } catch (error) {
      if (error) console.log(error);
      res.send(JSON.stringify('error from product-search'));
    }
  }
);

export default router;
