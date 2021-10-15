import { Router } from 'express';
import UserController from '../controllers/UserController';
import { auth } from '../middlewares/authMiddleware';


const router = Router();

const {
  newUser,
  editUser,
  deleteUser,
  getUser,
  login
} = UserController;

router.post('/create', newUser);
router.post('/login', login);
router.put('/edit', auth, editUser);
router.delete('/delete', auth, deleteUser);
router.get('/get', auth, getUser);

export default router;
