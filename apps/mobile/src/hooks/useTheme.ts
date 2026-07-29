import { useThemeStore } from '../stores/theme.store';
export const useTheme = () => {
  const theme = useThemeStore(state => state.theme);
  const mode = useThemeStore(state => state.mode);
  const setMode = useThemeStore(state => state.setMode);
  return { theme, mode, setMode };
};
