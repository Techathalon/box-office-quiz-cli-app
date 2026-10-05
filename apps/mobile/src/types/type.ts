import { ImageSourcePropType } from 'react-native';
export interface Card {
  id: number;
  title: string;
  desc: string;
  icon?: any;
  characterImg?: ImageSourcePropType;
  handlePress?: () => void;
  mode: 'row' | 'column';
  buttonText?: string;
  hasToggle?: boolean; // Pass true if this column card is a settings toggle
  toggleValue?: boolean; // Controlled switch value
  onToggleChange?: (val: boolean) => void;
}
export const GameMode = {
  BLURRED_POSTER: 'BLURRED_POSTER',
  EMOJI_RIDDLES: 'EMOJI_RIDDLES',
  LETTER_PUZZLE: 'LETTER_PUZZLE',
  DIALOGUE_GURU: 'DIALOGUE_GURU',
  SPOT_THE_EXACT: 'SPOT_THE_EXACT',
  MISSING_LETTERS: 'MISSING_LETTERS',
} as const;

export type GameMode = (typeof GameMode)[keyof typeof GameMode];
export interface User {
  userId: number;
  name: string;
  avatar: string;
  wonCount: number;
  lostCount: number;
}
export interface UserProgress {
  wonCount: number;
  lostCount: number;
}
