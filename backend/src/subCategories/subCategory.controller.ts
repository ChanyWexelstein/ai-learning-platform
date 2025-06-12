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

export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.categoryId);
  if (isNaN(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  const subCategories = await subCategoryService.getSubCategoriesByCategory(categoryId);
  res.json(subCategories);
};
