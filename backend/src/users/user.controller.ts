import { Request, Response } from 'express';
import * as userService from './user.service';
import { asyncHandler } from '../middlewares/errorHandler';
import prisma from '../config/db';

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: 'Missing ID param' });

  const userId = parseInt(id);
  const user = await userService.getUserById(userId);
  return res.json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, password } = req.body;
  const newUser = await userService.createUser(name, phone, password);
  return res.status(201).json(newUser);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, phone } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing ID param' });

  const userId = parseInt(id);
  const updated = await userService.updateUser(userId, name, phone);
  return res.json(updated);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: 'Missing ID param' });

  const userId = parseInt(id);
  await userService.deleteUser(userId);
  return res.status(204).send();
});

export const getAllUsersWithPrompts = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { prompts: true },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

