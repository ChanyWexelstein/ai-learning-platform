import { Request, Response } from 'express';
import * as authService from './auth.service';

export const register = async (req: Request, res: Response) => {
  const { name, phone, password } = req.body;
  try {
    const user = await authService.register(name, phone, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  try {
    const token = await authService.login(phone, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
