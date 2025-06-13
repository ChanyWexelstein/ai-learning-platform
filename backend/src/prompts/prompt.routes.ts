import express from 'express';
import {
  getAllPrompts,
  getPromptsByUser,
  createPrompt
} from './prompt.controller';

const router = express.Router();

router.route('/')
  .get(getAllPrompts)
  .post(createPrompt);

router.get('/user/:userId', getPromptsByUser);

export default router;
