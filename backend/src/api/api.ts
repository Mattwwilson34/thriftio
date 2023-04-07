import express from 'express';
import {Request, Response} from 'express';

const router = express.Router();

router.get('/products', (req: Request, res: Response): void => {
  res.send('products');
})

export default router;
