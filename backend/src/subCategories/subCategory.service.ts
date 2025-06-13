import prisma from '../config/db';

export const getAllSubCategories = async () => {
  try {
    return await prisma.subCategory.findMany();
  } catch (err) {
    throw new Error('Failed to fetch sub-categories');
  }
};

export const getSubCategoriesByCategory = async (categoryId: number) => {
  try {
    return await prisma.subCategory.findMany({
      where: { categoryId },
    });
  } catch (err) {
    throw new Error('Failed to fetch sub-categories by category');
  }
};

export const createSubCategory = async (name: string, categoryId: number) => {
  if (!name || !categoryId) {
    throw new Error('Name and categoryId are required');
  }

  try {
    return await prisma.subCategory.create({
      data: { name, categoryId },
    });
  } catch (err) {
    throw new Error('Failed to create sub-category');
  }
};

export const getSubCategoryById = async (subCategoryId: number) => {
  try {
    const subCategory = await prisma.subCategory.findFirst({
      where: { id: subCategoryId },
    });

    if (!subCategory) {
      throw new Error('Sub-category not found');
    }

    return subCategory;
  } catch (err) {
    throw new Error('Failed to get sub-category');
  }
};
