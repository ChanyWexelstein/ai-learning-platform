import { Request, Response, NextFunction } from 'express';
import * as promptService from './prompt.service';

export const getAllPrompts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await promptService.getAllPrompts();
    res.json(prompts);
  } catch (err) {
    next(err);
  }
};

export const getPromptsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIdStr = req.params.userId;
    if (!userIdStr) {
      return res.status(400).json({ error: 'Missing userId param' });
    }

    const userId = parseInt(userIdStr);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId param' });
    }

    const prompts = await promptService.getPromptsByUser(userId);
    return res.json(prompts);
  } catch (err) {
    return next(err);
  }
};

export const createPrompt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPrompt = await promptService.runPrompt(
      Number(userId),
      Number(categoryId),
      Number(subCategoryId),
      prompt
    );

    return res.status(201).json(newPrompt);
  } catch (err) {
    return next(err);
  }
};
