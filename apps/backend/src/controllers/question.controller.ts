import type { Request, Response } from 'express';
import { GameMode } from '../../generated/prisma/enums.js';
import {
  getQuestion,
  getQuestionsCount,
} from '../services/question.service.js';
export async function getQuestionController(req: Request, res: Response) {
  const { mode, level } = req.body;
  if (!mode || !level) {
    return res.status(400).json({
      success: false,
      message: 'Missing mode or level',
    });
  }
  try {
    const question = await getQuestion(
      mode as GameMode,
      parseInt(level as string),
    );
    return res.status(200).json({
      success: true,
      message: 'Question fetched successfully',
      question,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
export async function getQuestionsCountController(req: Request, res: Response) {
  try {
    const questionsCount = await getQuestionsCount();
    return res.status(200).json({
      success: true,
      message: 'Questions count fetched successfully',
      questionsCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
