import { Request, Response } from 'express';
import * as userService from './user.service';
import { asyncHandler } from '../middlewares/errorHandler';
import prisma from '../config/db';

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'Missing ID param' });
  }

  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid ID param' });
  }

  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = await userService.createUser(name, phone, password);
  return res.status(201).json(newUser);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, phone } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID param' });
  }

  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid ID param' });
  }

  const updated = await userService.updateUser(userId, name, phone);
  if (!updated) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json(updated);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID param' });
  }

  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid ID param' });
  }

  const deleted = await userService.deleteUser(userId);
  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(204).send();
});

export const getAllUsersWithPrompts = asyncHandler(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { prompts: true },
  });

  return res.json(users);
});
