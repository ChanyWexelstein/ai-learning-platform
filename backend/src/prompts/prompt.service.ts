import prisma from '../config/db';

export const getAllPrompts = () => {
  return prisma.prompt.findMany();
};

export const getPromptsByUser = (userId: number) => {
  return prisma.prompt.findMany({
    where: { userId }
  });
};

export const createPrompt = (
  userId: number,
  categoryId: number,
  subCategoryId: number,
  prompt: string,
  response: string
) => {
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
