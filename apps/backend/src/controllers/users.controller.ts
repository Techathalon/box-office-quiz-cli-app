import type { Request, Response } from 'express';
import {
  handleDeviceOnboarding,
  handleEditProfile,
  getAvatarOptions,
} from '../services/users.service.js';
export async function handleDeviceOnboardingController(
  req: Request,
  res: Response,
) {
  const { deviceToken, deviceType } = req.body;
  if (!deviceToken || !deviceType) {
    return res.status(400).json({
      success: false,
      message: 'Missing deviceToken or deviceType',
    });
  }
  try {
    const user = await handleDeviceOnboarding(deviceToken, deviceType);
    return res.status(200).json({
      success: true,
      message: 'Device onboarding successful',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
export async function handleEditProfileController(req: Request, res: Response) {
  const { name, avatar, deviceToken } = req.body;
  if (!name || !avatar || !deviceToken) {
    return res.status(400).json({
      success: false,
      message: 'Missing name, avatar or deviceToken',
    });
  }
  try {
    const user = await handleEditProfile(name, avatar, deviceToken);
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
export async function getAvatarOptionsController(req: Request, res: Response) {
  try {
    const avatarOptions = await getAvatarOptions();
    return res.status(200).json({
      success: true,
      message: 'Avatar options fetched successfully',
      avatarOptions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
