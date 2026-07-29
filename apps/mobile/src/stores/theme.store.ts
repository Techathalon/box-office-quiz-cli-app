import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { keychainStorageAdapter } from '../utils/keychainStorageAdapter';
import { Theme, darkTheme, lightTheme } from '../theme/colors';

export type ThemeMode = 'light' | 'dark' | 'system';
type ThemeState = {
  mode: ThemeMode;
  theme: Theme;
  setMode: (
    mode: ThemeMode,
    systemColorScheme?: 'light' | 'dark' | null,
  ) => void;
};
export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'light',
      theme: lightTheme,
      setMode: (
        mode: ThemeMode,
        systemColorScheme?: 'light' | 'dark' | null,
      ) => {
        let newTheme = lightTheme;
        if (mode === 'system') {
          newTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
        } else {
          newTheme = mode === 'dark' ? darkTheme : lightTheme;
        }
        set({ mode, theme: newTheme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => keychainStorageAdapter),
      partialize: state => ({
        mode: state.mode,
      }),
    },
  ),
);
