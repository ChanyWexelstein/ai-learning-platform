import { Router } from 'express';
import * as userController from './user.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, requireAdmin, userController.createUser);
router.get('/', authenticate, requireAdmin, userController.getAllUsers);
router.delete('/:id', authenticate, requireAdmin, userController.deleteUser);

router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);

router.get('/:id/prompts', authenticate, userController.getPromptsByUserId);

export default router;
