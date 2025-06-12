import { Router } from 'express';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';
import { getAllUsersWithPrompts } from '../users/user.controller';

const router = Router();

router.get('/users', authenticate, requireAdmin, getAllUsersWithPrompts);

export default router;
