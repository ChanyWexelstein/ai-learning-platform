import { Router } from 'express';
import { requireAdmin, authenticate } from '../middlewares/auth.middleware';
import * as userController from './user.controller';

const router = Router();

router.post('/', authenticate, requireAdmin, userController.createUser);

router.get('/', authenticate, requireAdmin, userController.getAllUsers);

router.get('/:id', authenticate, userController.getUserById);

router.put('/:id', authenticate, userController.updateUser);

router.delete('/:id', authenticate, requireAdmin, userController.deleteUser);

export default router;
