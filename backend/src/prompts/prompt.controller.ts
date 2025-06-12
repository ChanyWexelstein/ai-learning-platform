import { Request, Response } from 'express';
import * as promptService from './prompt.service';

export const getAllPrompts = async (_req: Request, res: Response) => {
  const prompts = await promptService.getAllPrompts();
  return res.json(prompts);
};

export const getPromptsByUser = async (req: Request, res: Response) => {
  const userIdStr = req.params.userId;
  if (!userIdStr) return res.status(400).json({ error: 'Missing userId param' });

  const userId = parseInt(userIdStr);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId param' });

  const prompts = await promptService.getPromptsByUser(userId);
  return res.json(prompts);
};

export const createPrompt = async (req: Request, res: Response) => {
  const { userId, categoryId, subCategoryId, prompt, response } = req.body;

  const newPrompt = await promptService.runPrompt(
    Number(userId),
    Number(categoryId),
    Number(subCategoryId),
    prompt,
  );
  

  return res.status(201).json(newPrompt);
};
