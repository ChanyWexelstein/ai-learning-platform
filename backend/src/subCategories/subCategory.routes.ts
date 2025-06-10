import express from 'express';
import {
  getAllSubCategories,
  getSubCategoriesByCategory,
  createSubCategory
} from './subCategory.controller';

const router = express.Router();

router.get('/', getAllSubCategories);
router.get('/category/:categoryId', getSubCategoriesByCategory);
router.post('/', createSubCategory);

export default router;
