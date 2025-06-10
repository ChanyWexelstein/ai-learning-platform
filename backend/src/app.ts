import express from 'express';
import cors from 'cors';

import userRoutes from './users/user.routes';
import categoryRoutes from './categories/category.routes';
import subCategoryRoutes from './subCategories/subCategory.routes';
import promptRoutes from './prompts/prompt.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sub-categories', subCategoryRoutes);
app.use('/api/prompts', promptRoutes);

app.use(errorHandler);

export default app;
