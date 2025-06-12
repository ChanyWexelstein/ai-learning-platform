import prisma from '../config/db';

export const getAllSubCategories = () => {
  return prisma.subCategory.findMany();
};

export const getSubCategoriesByCategory = async (categoryId: number) => {
  return prisma.subCategory.findMany({
    where: { categoryId },
  });
};

export const createSubCategory = (name: string, categoryId: number) => {
  return prisma.subCategory.create({
    data: { name, categoryId }
  });
};

export const getSubCategoryById = async (subCategoryId: number) => {
  return prisma.subCategory.findFirst({
    where: { id: subCategoryId },
  });
};
