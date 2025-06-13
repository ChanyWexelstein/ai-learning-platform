import prisma from '../config/db';
import { getCategoryById } from '../categories/category.service';
import { getSubCategoryById } from '../subCategories/subCategory.service';
import { askOpenAI } from './openai.service';

export const getAllPrompts = async () => {
  try {
    return await prisma.prompt.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        subCategory: true,
      },
    });
  } catch (err) {
    throw new Error('Failed to fetch prompts');
  }
};

export const getPromptsByUser = async (userId: number) => {
  try {
    return await prisma.prompt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        subCategory: true,
      },
    });
  } catch (err) {
    throw new Error('Failed to fetch prompts for user');
  }
};

export const getPromptById = async (id: number) => {
  try {
    return await prisma.prompt.findUnique({
      where: { id },
      include: {
        category: true,
        subCategory: true,
      },
    });
  } catch (err) {
    throw new Error('Failed to fetch prompt');
  }
};

export const runPrompt = async (
  userId: number,
  categoryId: number,
  subCategoryId: number,
  description: string
) => {
  try {
    const category = await getCategoryById(categoryId);
    if (!category) throw new Error('Category not found');

    const subCategory = await getSubCategoryById(subCategoryId);
    if (!subCategory) throw new Error('SubCategory not found');

    const response = await askOpenAI(
      `Give me a lesson on category: ${category.name} and on sub category: ${subCategory.name} with the description: ${description}`
    );

    return await prisma.prompt.create({
      data: {
        userId,
        categoryId,
        subCategoryId,
        prompt: description,
        response,
      },
    });
  } catch (err) {
    throw new Error('Failed to run prompt: ' + (err as Error).message);
  }
};
