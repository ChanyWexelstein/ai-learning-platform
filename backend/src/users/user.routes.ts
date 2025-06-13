import { Router } from 'express';
import * as userController from './user.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, requireAdmin, userController.createUser);
router.get('/', authenticate, requireAdmin, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);

router.get('/:id/prompts', authenticate, userController.getPromptsByUserId);

export default router;
