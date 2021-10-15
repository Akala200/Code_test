
import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

const {
  deposit,
  buy,
  resetDeposit

} = TransactionController;

router.post('/deposit', auth, deposit);
router.post('/buy', auth, buy);
router.post('/reset', auth, resetDeposit);


export default router;
