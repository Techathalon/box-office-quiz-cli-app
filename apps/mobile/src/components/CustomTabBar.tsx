import React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../hooks/useTheme';

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  // Center the tab bar nicely if it's running on a wide screen or tablet
  const isLargeScreen = width > 600;
  const horizontalMargin = isLargeScreen ? (width - 500) / 2 : 16;

  return (
    // Outer floating container positioned at the bottom absolute center
    <View
      className="absolute bottom-6 flex-row items-center justify-between px-9 bg-transparent"
      style={{
        left: horizontalMargin,
        right: horizontalMargin,
      }}
    >
      {/* Main Navigation Pill Bar */}
      <View
        className="flex-1 flex-row items-center justify-between rounded-full h-14 px-4 border"
        style={{
          backgroundColor: theme.lightskyprimary,
          borderColor: theme.border,
          borderWidth: 1,
          //opacity: 0.95,
          ...Platform.select({
            ios: {
              shadowColor: theme.black,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: theme.black === '#000000' ? 0.06 : 0.25,
              shadowRadius: 15,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Assign matching custom icons based on route name
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Leaderboard') iconName = 'award';
          else if (route.name === 'Notifications') iconName = 'bell';
          else if (route.name === 'Profile') iconName = 'user';

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              activeOpacity={0.7}
              className="flex-1 items-center justify-center h-11 rounded-full"
              style={{
                backgroundColor: isFocused
                  ? `${theme.primary}1A`
                  : 'transparent',
              }}
            >
              <Icon
                name={iconName}
                size={22}
                color={isFocused ? theme.primary : theme.textSecondary}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
