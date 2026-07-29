import { Router } from 'express';
import {
  updateLevelDataController,
  getLevelsForModeController,
  getAllUsersWithProgressController,
  getUserProgressController,
} from '../controllers/game.controller.js';

const router = Router();

router.post('/levels-for-mode', getLevelsForModeController);
router.post('/update-level-data', updateLevelDataController);
router.post('/all-users-with-progress', getAllUsersWithProgressController);
router.post('/user-progress', getUserProgressController);

export default router;
