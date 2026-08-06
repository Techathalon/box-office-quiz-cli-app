import React from 'react';
import { ImageBackground, ViewProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { View } from 'moti';
import BannerAdView from './BannerAdView';

interface AppLayoutProps extends ViewProps {
  children: React.ReactNode;
}

export default function AppLayout({ children, ...props }: AppLayoutProps) {
  const { mode } = useTheme();
  return (
    <ImageBackground
      source={require('../../assets/background_bg.png')}
      className="flex-1"
      resizeMode="cover"
      {...props}
    >
      <View
        className={`absolute inset-0 ${mode === 'dark' ? 'bg-black/60' : ''} }`}
      />
      {children}
      <View className="bottom-0 w-full items-center border-2  border-gray-300 bg-white">
        <BannerAdView />
      </View>
    </ImageBackground>
  );
}
