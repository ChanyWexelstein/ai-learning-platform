import { Request, Response } from 'express';
import * as categoryService from './category.service';

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const category = await categoryService.createCategory(name);
  res.status(201).json(category);
};
