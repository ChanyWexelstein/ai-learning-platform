import express from 'express';
import cors from 'cors';

import userRoutes from './users/user.routes';
import categoryRoutes from './categories/category.routes';
import subCategoryRoutes from './subCategories/subCategory.routes';
import promptRoutes from './prompts/prompt.routes';
import authRoutes from './auth/auth.routes';

import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './swagger';
import adminRoutes from './admin/admin.routes';

const app = express();
app.use(cors());
app.use(express.json());

// Swagger Docs
setupSwagger(app);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sub-categories', subCategoryRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


// Global Error Handler
app.use(errorHandler);

export default app;
