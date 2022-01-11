/* eslint-disable import/named */

import { Router } from 'express';
import ErrorController from '../controllers/ErrorController';

const router = Router();

const {
  writeError
} = ErrorController;

router.post('/create', writeError);


export default router;
