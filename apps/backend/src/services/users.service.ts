import {
  generateTeddyEmoji,
  generateFilmyComedyName,
} from '../utils/generators.js';
import prisma from '../config/prisma.js';
import { TEDDY_EMOJIS } from '../utils/generators.js';

export async function handleDeviceOnboarding(
  deviceTokenValue: string,
  deviceType: string,
) {
  const name = generateFilmyComedyName();
  const avatar = generateTeddyEmoji();

  if (deviceTokenValue && deviceType && name && avatar) {
    const user = await prisma.user.findUnique({
      where: {
        deviceToken: deviceTokenValue,
      },
    });
    if (!user) {
      return await prisma.user.create({
        data: {
          deviceToken: deviceTokenValue,
          deviceType,
          name,
          avatar,
        },
      });
    }
    return user;
  }

  return null;
}
export async function handleEditProfile(
  name: string,
  avatar: string,
  deviceToken: string,
) {
  const user = await prisma.user.findUnique({
    where: {
      deviceToken: deviceToken,
    },
  });
  if (user) {
    return await prisma.user.update({
      where: {
        deviceToken: deviceToken,
      },
      data: {
        name,
        avatar,
      },
    });
  }
  return null;
}
export async function getAvatarOptions() {
  return TEDDY_EMOJIS;
}
