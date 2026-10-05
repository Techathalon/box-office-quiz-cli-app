import useAuthStore from '../stores/auth.store';
export const useAuth = () => {
  const { user, setUser, setTotalQuestions, totalQuestions } = useAuthStore();
  return { user, setUser, setTotalQuestions, totalQuestions };
};
