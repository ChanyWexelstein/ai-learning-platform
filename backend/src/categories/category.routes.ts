import express from 'express';
import { getAllCategories, createCategory } from './category.controller';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);

export default router;
