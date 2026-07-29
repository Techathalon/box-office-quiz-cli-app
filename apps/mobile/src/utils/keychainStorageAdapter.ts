import * as Keychain from 'react-native-keychain';
import type { StateStorage } from 'zustand/middleware';
export const keychainStorageAdapter: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: name });
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error reading theme from keychain:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string, key?: string): Promise<void> => {
    try {
      await Keychain.setGenericPassword(key || name, value, {
        service: name,
      });
    } catch (error) {
      console.error('Error writing theme to keychain:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await Keychain.resetGenericPassword({ service: name });
    } catch (error) {
      console.error('Error resetting theme keychain entry:', error);
    }
  },
};
