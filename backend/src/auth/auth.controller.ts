import { Request, Response } from 'express';
import * as authService from './auth.service';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../middlewares/errorHandler';
import { ApiError } from '../middlewares/ApiError';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    throw new ApiError('Missing name, phone or password', 400);
  }

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 30) {
    throw new ApiError('Name must be between 2 and 30 characters', 400);
  }

  const phoneRegex = /^05\d{8}$/;
  if (!phoneRegex.test(phone)) {
    throw new ApiError('Phone must be a valid Israeli number (e.g., 0501234567)', 400);
  }

  if (typeof password !== 'string' || password.length < 6) {
    throw new ApiError('Password must be at least 6 characters', 400);
  }

  const user = await authService.register(name.trim(), phone, password);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(201).json({ token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new ApiError('Missing name or password', 400);
  }

  const user = await authService.loginByName(name, password);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({ token });
});
