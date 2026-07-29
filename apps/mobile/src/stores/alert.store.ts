import { create } from 'zustand';
interface AlertOptions {
  title: string;
  message: string;
  type?: 'warning' | 'danger' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
interface AlertState extends AlertOptions {
  visible: boolean;
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}
const initialState = {
  visible: false,
  title: '',
  message: '',
  type: 'info' as const,
  confirmText: '',
  cancelText: '',
  onConfirm: undefined,
  onCancel: undefined,
};

export const useAlertStore = create<AlertState>(set => ({
  ...initialState,
  showAlert: (options: AlertOptions) => {
    set({ ...initialState, ...options, visible: true });
  },
  hideAlert: () => {
    set({ ...initialState, visible: false });
  },
}));
