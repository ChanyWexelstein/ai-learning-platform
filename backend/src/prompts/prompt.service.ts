import prisma from '../config/db';
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
  prompt: string,
) => {
  if(!prompt){
    console.log('prompt is empty ????');
    return;
  }
  const response = await askOpenAI(prompt);
  return prisma.prompt.create({
    data: {
      userId,
      categoryId,
      subCategoryId,
      prompt,
      response
    }
  });
};
