import prisma from '../config/db';

export const getAllCategories = () => {
  return prisma.category.findMany();
};

export const createCategory = (name: string) => {
  return prisma.category.create({
    data: { name }
  });
};
