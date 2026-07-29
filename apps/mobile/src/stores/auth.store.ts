import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { keychainStorageAdapter } from '../utils/keychainStorageAdapter';
interface User {
  id: number;
  name: string;
  avatar: string;
  deviceToken: string;
  deviceType: string;
}
type AuthState = {
  user: User | null;
  totalQuestions: number;
  setUser: (user: any) => void;
  setTotalQuestions: (totalQuestions: number) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      totalQuestions: 0,
      setTotalQuestions: (totalQuestions: number) => set({ totalQuestions }),
      setUser: (user: any) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => keychainStorageAdapter),
    },
  ),
);

export default useAuthStore;
