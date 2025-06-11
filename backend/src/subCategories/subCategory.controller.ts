import { Request, Response } from 'express';
import * as subCategoryService from './subCategory.service';

export const getAllSubCategories = async (_req: Request, res: Response) => {
  const subCategories = await subCategoryService.getAllSubCategories();
  res.json(subCategories);
};

export const createSubCategory = async (req: Request, res: Response) => {
  const { name, categoryId } = req.body;
  const newSubCategory = await subCategoryService.createSubCategory(name, categoryId);
  res.status(201).json(newSubCategory);
};
