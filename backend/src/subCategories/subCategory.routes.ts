import { Router } from 'express';
import {
  getAllSubCategories,
  createSubCategory
} from './subCategory.controller';

const router = Router();

router.get('/', getAllSubCategories);
router.post('/', createSubCategory);

export default router;
