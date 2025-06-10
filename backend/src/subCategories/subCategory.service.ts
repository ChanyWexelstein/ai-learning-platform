import prisma from '../config/db';

export const getAllSubCategories = () => {
  return prisma.subCategory.findMany();
};

export const getSubCategoriesByCategory = (categoryId: number) => {
  return prisma.subCategory.findMany({
    where: { categoryId }
  });
};

export const createSubCategory = (name: string, categoryId: number) => {
  return prisma.subCategory.create({
    data: { name, categoryId }
  });
};
