import {
  getLevelsForMode,
  updateLevelData,
  getAllUsersWithProgress,
  getUserProgress,
} from '../services/game.service.js';
import type { Request, Response } from 'express';
import { GameMode } from '../../generated/prisma/enums.js';

export async function getLevelsForModeController(req: Request, res: Response) {
  const { userId, mode } = req.body;
  if (!userId || !mode) {
    return res.status(400).json({
      success: false,
      message: 'Missing userId or mode',
    });
  }
  try {
    const levels = await getLevelsForMode(
      parseInt(userId as string),
      mode as GameMode,
    );
    return res.status(200).json({
      success: true,
      message: 'Levels for mode fetched successfully',
      levels,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

export async function updateLevelDataController(req: Request, res: Response) {
  const { userId, mode, level, won } = req.body;
  if (!userId || !mode || !level) {
    return res.status(400).json({
      success: false,
      message: 'Missing userId, mode, level or won',
    });
  }
  try {
    const updatedLevelData = await updateLevelData(
      parseInt(userId as string),
      mode as GameMode,
      parseInt(level as string),
      won as boolean,
    );
    return res.status(200).json({
      success: true,
      message: 'Level data updated successfully',
      updatedLevelData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
export async function getAllUsersWithProgressController(
  req: Request,
  res: Response,
) {
  try {
    const { page, pageSize, mode } = req.body;
    if (!page || !pageSize) {
      return res.status(400).json({
        success: false,
        message: 'Missing page or pageSize',
      });
    }
    const usersWithProgress = await getAllUsersWithProgress(
      page,
      pageSize,
      mode,
    );
    return res.status(200).json({
      success: true,
      message: 'Users with progress fetched successfully',
      usersWithProgress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

export async function getUserProgressController(req: Request, res: Response) {
  try {
    const rawUserId = req.body?.userId;

    // Convert safely regardless of whether it's string ("5") or number (5)
    const userId = Number(rawUserId);

    if (!rawUserId || isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing userId',
      });
    }

    const userProgress = await getUserProgress(userId);
    return res.status(200).json({
      success: true,
      message: 'User progress fetched successfully',
      userProgress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
