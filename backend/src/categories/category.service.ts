import  prisma  from '../config/db';

export const getAllCategories = async () => {
  try {
    return await prisma.category.findMany();
  } catch (err) {
    throw new Error('Failed to fetch categories');
  }
};

export const createCategory = async (name: string) => {
  if (!name) {
    throw new Error('Category name is required');
  }

  try {
    return await prisma.category.create({
      data: { name },
    });
  } catch (err) {
    throw new Error('Failed to create category');
  }
};

export const getCategoryById = async (categoryId: number) => {
  try {
    const category = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  } catch (err) {
    throw new Error('Failed to get category');
  }
};
