import { Router } from 'express';
import {
  getAllSubCategories,
  createSubCategory,
  getSubCategoriesByCategory 
} from './subCategory.controller';

const router = Router();

router.route('/')
  .get(getAllSubCategories)
  .post(createSubCategory);

router.get('/byCategory/:categoryId', getSubCategoriesByCategory);


export default router;
