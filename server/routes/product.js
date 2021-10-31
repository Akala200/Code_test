/* eslint-disable import/named */

import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

const {
  newProduct,
  getProduct,
  editProduct,
  deleteProduct
} = ProductController;

router.post('/create', auth, newProduct);
router.put('/edit', auth, editProduct);
router.delete('/delete', auth, deleteProduct);
router.get('/get', auth, getProduct);

export default router;
