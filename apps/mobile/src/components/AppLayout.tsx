import React from 'react';
import { ImageBackground, ViewProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { View } from 'moti';

interface AppLayoutProps extends ViewProps {
  children: React.ReactNode;
}

export default function AppLayout({ children, ...props }: AppLayoutProps) {
  const { mode } = useTheme();
  return (
    <ImageBackground
      source={require('../../assets/background_bg.png')} // Adjust relative path as needed
      className="flex-1"
      resizeMode="cover"
      {...props}
    >
      <View
        className={`absolute inset-0 ${mode === 'dark' ? 'bg-black/60' : ''} }`}
      />
      {children}
    </ImageBackground>
  );
}
