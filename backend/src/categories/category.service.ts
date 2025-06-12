import prisma from '../config/db';

export const getAllCategories = () => {
  return prisma.category.findMany();
};

export const createCategory = (name: string) => {
  return prisma.category.create({
    data: { name }
  });
};

export const getCategoryById = async (categoryId: number) => {
  return prisma.category.findFirst({
    where: { id: categoryId },
  });
};
