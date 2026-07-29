import axios from 'axios';
import { API_BASE_URL } from '@env';
import { GameMode } from '../types/type';
export const api = axios.create({
  baseURL: API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
export async function handleDeviceOnboarding(
  deviceToken: string,
  deviceType: string,
) {
  const response = await api.post('/users/device-onboarding', {
    deviceToken,
    deviceType,
  });
  return response.data;
}
export async function handleEditProfile(
  name: string,
  avatar: string,
  deviceToken: string,
) {
  const response = await api.post('/users/edit-profile', {
    name,
    avatar,
    deviceToken,
  });
  return response.data;
}
export async function getAvatarOptions() {
  const response = await api.get('/users/avatar-options');
  return response.data;
}

export async function getQuestion(mode: GameMode, level: number) {
  const response = await api.post('/question', {
    mode,
    level,
  });
  return response.data;
}
export async function getLevelsForMode(userId: number, mode: GameMode) {
  const response = await api.post('/game/levels-for-mode', {
    userId,
    mode,
  });
  return response.data;
}
export async function updateLevelData(
  userId: number,
  mode: GameMode,
  level: number,
  won: boolean,
) {
  const response = await api.post('/game/update-level-data', {
    userId,
    mode,
    level,
    won,
  });
  return response.data;
}
export async function getAllUsersWithProgress(
  page: number,
  pageSize: number,
  mode?: GameMode,
) {
  const response = await api.post('/game/all-users-with-progress', {
    page,
    pageSize,
    mode,
  });
  return response.data;
}

export async function getUserProgress(userId: number) {
  const response = await api.post(`/game/user-progress/`, {
    userId: userId,
  });
  return response.data;
}
export async function getQuestionsCount() {
  const response = await api.get('/question/count');
  console.log('questionsCount:', response.data);
  return response.data;
}
