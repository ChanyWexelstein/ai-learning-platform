import prisma from '../config/db';
import { getCategoryById } from '../categories/category.service';
import { getSubCategoryById } from '../subCategories/subCategory.service';
import { askOpenAI } from './openai.service';

export const getAllPrompts = () => {
  return prisma.prompt.findMany();
};

export const getPromptsByUser = (userId: number) => {
  return prisma.prompt.findMany({
    where: { userId }
  });
};

export const runPrompt = async (
  userId: number,
  categoryId: number,
  subCategoryId: number,
  description: string,
) => {
  const category = await getCategoryById(categoryId);
  if(!category){
    console.log('category is null');
    return;
  }

  const subCategory = await getSubCategoryById(subCategoryId);
  if(!subCategory){
    console.log('subCategory is null');
    return;
  }
  const response = await askOpenAI(`Give me a lesson on category: ${category.name} and on sub category: ${subCategory.name} with the description: ${description}`);
  return prisma.prompt.create({
    data: {
      userId,
      categoryId,
      subCategoryId,
      prompt: description,
      response
    }
  });
};
