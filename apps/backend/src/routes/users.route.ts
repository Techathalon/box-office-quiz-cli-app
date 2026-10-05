import {
  handleDeviceOnboardingController,
  handleEditProfileController,
  getAvatarOptionsController,
} from '../controllers/users.controller.js';
import Router from 'express';

const router = Router();

router.post('/device-onboarding', handleDeviceOnboardingController);
router.post('/edit-profile', handleEditProfileController);
router.get('/avatar-options', getAvatarOptionsController);

export default router;
