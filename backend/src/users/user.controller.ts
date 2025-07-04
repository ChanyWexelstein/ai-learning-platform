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

  if (/\d/.test(name)) {
    return res.status(400).json({ error: 'Name must not contain numbers' });
  }

  const phoneStr = String(phone).trim();
  if (!/^05\d{8}$/.test(phoneStr)) {
    return res.status(400).json({ error: 'Phone number must be 10 digits and start with 05' });
  }

  const newUser = await userService.createUser(name, phoneStr, password);
  return res.status(201).json(newUser);
});
export const getPromptsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: 'Missing ID param' });

  const userId = parseInt(id);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid ID param' });

  const prompts = await prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      subCategory: true,
    },
  });

  return res.json(prompts);
});
