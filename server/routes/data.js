import { Router } from 'express';
import DataController from '../controllers/DataController';


const router = Router();

const {
  purchaseData
} = DataController;

router.post('/purchase', purchaseData);

export default router;
