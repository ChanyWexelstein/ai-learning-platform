import { Request, Response } from 'express';
import * as subCategoryService from './subCategory.service';

export const getAllSubCategories = async (_req: Request, res: Response) => {
  const subCategories = await subCategoryService.getAllSubCategories();
  res.json(subCategories);
};

export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
  const categoryIdStr = req.params.categoryId;
  
  if (!categoryIdStr) {
    return res.status(400).json({ error: 'Missing categoryId param' });
  }

  const categoryId = parseInt(categoryIdStr);

  if (isNaN(categoryId)) {
    return res.status(400).json({ error: 'Invalid categoryId param' });
  }

  const subCategories = await subCategoryService.getSubCategoriesByCategory(categoryId);
  res.json(subCategories);
};

export const createSubCategory = async (req: Request, res: Response) => {
  const { name, categoryId } = req.body;
  const subCategory = await subCategoryService.createSubCategory(name, categoryId);
  res.status(201).json(subCategory);
};
