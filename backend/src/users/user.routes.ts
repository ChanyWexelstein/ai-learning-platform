import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from './user.controller';

const router = Router();

// POST /api/users - Create new user
router.post('/', createUser);

// GET /api/users - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

// PUT /api/users/:id - Update user
router.put('/:id', updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', deleteUser);

// (אם תוסיפי בעתיד login או history, תכתבי גם את ה־controller המתאים)

export default router;
