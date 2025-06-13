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

export const getPromptById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing prompt ID param' });

    const promptId = parseInt(id);
    if (isNaN(promptId)) return res.status(400).json({ error: 'Invalid prompt ID' });

    const prompt = await promptService.getPromptById(promptId);
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' });

    return res.json(prompt);
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
