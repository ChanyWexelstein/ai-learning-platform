import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const userController = new UserController();

// POST /api/users - Create new user
router.post('/', userController.createUser);

// POST /api/users/login - Login or create user
router.post('/login', userController.loginOrGetUser);

// GET /api/users - Get all users
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id - Update user
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', userController.deleteUser);

// GET /api/users/:id/history - Get user with learning history
router.get('/:id/history', userController.getUserWithHistory);

export default router;