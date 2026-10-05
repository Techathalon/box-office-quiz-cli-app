import { Router } from 'express';
import {
  getQuestionController,
  getQuestionsCountController,
} from '../controllers/question.controller.js';

const router = Router();

router.post('/', getQuestionController);
router.get('/count', getQuestionsCountController);

export default router;
