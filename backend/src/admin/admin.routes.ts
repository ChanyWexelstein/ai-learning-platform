import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';
import { getAllUsers } from '../users/user.controller';

const router = Router();

router.get('/users', authenticate, requireAdmin, getAllUsers);

export default router;
