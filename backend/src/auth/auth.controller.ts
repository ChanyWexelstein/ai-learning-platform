import { Request, Response } from 'express';
import * as authService from './auth.service';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../middlewares/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    res.status(400);
    throw new Error('Missing name, phone or password');
  }

  const user = await authService.register(name, phone, password);
  res.status(201).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error('Missing name or password');
  }

  const user = await authService.loginByName(name, password);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({ token });
});
