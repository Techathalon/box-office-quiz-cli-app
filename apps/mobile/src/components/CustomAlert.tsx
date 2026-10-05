import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/Feather';
import { useTheme } from '../hooks/useTheme';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: 'success' | 'warning' | 'danger' | 'info';
}

export default function CustomAlert({
  visible,
  title,
  message,
  confirmText = 'OK',
  cancelText,
  onConfirm,
  onCancel,
  type = 'info',
}: CustomAlertProps) {
  const { theme } = useTheme();

  const config = {
    success: {
      icon: 'check-circle',
      color: '#22C55E',
      bg: '#DCFCE7',
    },
    warning: {
      icon: 'warning',
      color: '#F59E0B',
      bg: '#FEF3C7',
    },
    danger: {
      icon: 'error',
      color: '#EF4444',
      bg: '#FEE2E2',
    },
    info: {
      icon: 'info',
      color: '#3B82F6',
      bg: '#DBEAFE',
    },
  }[type];

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View
          className="w-full max-w-md rounded-3xl p-6"
          style={{
            backgroundColor: theme.card,
          }}
        >
          {/* Icon */}
          <View className="items-center">
            <View
              className="h-20 w-20 items-center justify-center rounded-full"
              style={{
                backgroundColor: config.bg,
              }}
            >
              <MaterialIcons
                name={config.icon}
                size={42}
                color={config.color}
              />
            </View>
          </View>

          {/* Title */}
          <Text
            className="mt-5 text-center text-2xl font-bold"
            style={{ color: theme.text }}
          >
            {title}
          </Text>

          {/* Message */}
          <Text
            className="mt-3 text-center text-base leading-6"
            style={{ color: theme.textSecondary }}
          >
            {message}
          </Text>

          {/* Buttons */}
          <View className={`mt-8 ${cancelText ? 'flex-row' : ''}`}>
            {cancelText && (
              <Pressable
                onPress={onCancel}
                className="mr-3 flex-1 rounded-xl border py-3"
                style={{
                  borderColor: theme.border,
                }}
              >
                <Text
                  className="text-center text-base font-semibold"
                  style={{ color: theme.text }}
                >
                  {cancelText}
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={onConfirm}
              className="flex-1 rounded-xl py-3"
              style={{
                backgroundColor: config.color,
              }}
            >
              <Text className="text-center text-base font-bold text-white">
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
