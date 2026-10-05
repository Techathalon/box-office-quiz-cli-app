import { NavigatorScreenParams } from '@react-navigation/native';
import { GameMode } from '../types/type';
export type HomeStackParamList = {
  Home: undefined;
  Leaderboard: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  Welcome: undefined;
  AppTabs: NavigatorScreenParams<HomeStackParamList>;
  LevelSelection: { mode: GameMode; title: string };
  GameplayScreen: {
    mode: GameMode;
    level: number;
  };
};
