import { useAlertStore } from '../stores/alert.store';

export const useAlert = () => {
  const { showAlert, hideAlert } = useAlertStore();
  return { showAlert, hideAlert };
};
