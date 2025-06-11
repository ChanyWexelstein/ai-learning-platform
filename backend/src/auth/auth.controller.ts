import { Request, Response } from 'express';
import * as authService from './auth.service';

export const register = async (req: Request, res: Response) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ error: 'Missing name, phone or password' });
  }

  try {
    const user = await authService.register(name, phone, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
    return;
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: 'Missing name or password' });
  }

  try {
    const token = await authService.loginByName(name, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
    return;
};
