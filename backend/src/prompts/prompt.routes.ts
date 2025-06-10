import express from 'express';
import {
  getAllPrompts,
  getPromptsByUser,
  createPrompt
} from './prompt.controller';

const router = express.Router();

router.get('/', getAllPrompts);
router.get('/user/:userId', getPromptsByUser);
router.post('/', createPrompt);

export default router;
