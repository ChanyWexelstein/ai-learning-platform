import { Request, Response, NextFunction } from 'express';
import * as subCategoryService from './subCategory.service';

export const getAllSubCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const subCategories = await subCategoryService.getAllSubCategories();
    res.json(subCategories);
  } catch (err) {
    next(err);
  }
};

export const createSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ error: 'Missing name or categoryId' });
    }

    const newSubCategory = await subCategoryService.createSubCategory(
      name,
      Number(categoryId)
    );
    return res.status(201).json(newSubCategory);
  } catch (err) {
    return next(err);
  }
};

export const getSubCategoriesByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = Number(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const subCategories = await subCategoryService.getSubCategoriesByCategory(categoryId);
    return res.json(subCategories);
  } catch (err) {
    return next(err);
  }
};
