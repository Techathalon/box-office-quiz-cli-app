import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  Switch,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '../types/type';

const { width, height } = Dimensions.get('window');
const FULL_WIDTH = width - 40;
const CARD_WIDTH = (width - 40) / 2;

interface CardProps {
  mode: Card;
}

export default function CardPage({ mode }: CardProps) {
  const { theme } = useTheme();
  const [internalToggle, setInternalToggle] = useState(false);

  const isColumn = mode.mode === 'column';

  return (
    <View>
      <TouchableOpacity
        key={mode.id}
        activeOpacity={0.9}
        onPress={mode.handlePress}
        style={{
          width: isColumn ? FULL_WIDTH : CARD_WIDTH,
          // Slightly increased column height to 0.12 so typography and images layout elegantly together
          height: isColumn ? height * 0.12 : height * 0.2,
          backgroundColor: `${theme.card}`,
          borderColor: '#E2E8F0',
          ...Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
            },
            android: { elevation: 2 },
          }),
        }}
        className={`p-4 rounded-[24px] border relative overflow-hidden mb-4 ${
          isColumn
            ? 'flex-row items-center justify-between' // Premium horizontal layout for column
            : 'flex-col justify-between' // Untouched row layout logic
        }`}
      >
        {/* ROW MODE ONLY: Background Illustration Layer (Untouched) */}
        {!isColumn && mode.characterImg && (
          <View className="absolute right-[-10px] bottom-[-23px] w-[85%] h-[80%] pointer-events-none ">
            <Image
              source={mode.characterImg}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>
        )}

        {/* LEFT SIDE LAYER: Icon + Text Content */}
        <View
          className={`flex-1 flex-row items-center ${
            isColumn ? 'pr-4' : 'h-full flex-col justify-between'
          }`}
        >
          {/* Main info container grouping icon and text */}
          <View
            className={`${
              isColumn ? 'flex-row items-center flex-1' : 'w-full'
            }`}
          >
            {/* Category Icon */}
            {mode.icon && (
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: theme.iconBg }}
              >
                <Icon
                  name={mode.icon}
                  size={width * 0.045}
                  color={theme.iconText}
                />
              </View>
            )}

            {/* Typography Labels */}
            <View
              className={`${
                isColumn ? 'ml-3.5 flex-1 justify-center' : 'mt-2'
              }`}
            >
              <Text
                className={`font-black tracking-tight text-slate-900 ${
                  isColumn ? 'text-lg mb-0' : 'text-base mb-0.5'
                }`}
                numberOfLines={1}
              >
                {mode.title}
              </Text>

              <Text
                className={` leading-tight text-slate-500 text-[11px] ${
                  isColumn ? 'text-[14px]' : 'text-[13px]'
                }`}
                numberOfLines={isColumn ? 2 : 3}
              >
                {mode.desc}
              </Text>
            </View>
          </View>

          {/* ROW MODE ONLY: Grid Clean Action Button (Untouched) */}
          {!isColumn && mode.buttonText && (
            <View
              className="px-4 py-1.5 rounded-full self-start items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <Text className="text-[10px] font-black text-white tracking-wider uppercase">
                {mode.buttonText}
              </Text>
            </View>
          )}
        </View>

        {isColumn && (
          <View className="flex-row items-center justify-end h-full min-w-[60px]">
            {mode.hasToggle ? (
              /* Option A: Settings Action Toggle Switch */
              <Switch
                value={mode.onToggleChange ? mode.toggleValue : internalToggle}
                onValueChange={mode.onToggleChange || setInternalToggle}
                trackColor={{ false: '#CBD5E1', true: theme.primary }}
                thumbColor={theme.white}
              />
            ) : mode.characterImg ? (
              /* Option B: Clean Right-Aligned Avatar/Character Image Showcase */
              <View className="w-40 h-40 rounded-2xl overflow-visible   botton-[-20px]">
                <Image
                  source={mode.characterImg}
                  resizeMode="contain"
                  className="w-full h-full"
                />
              </View>
            ) : mode.buttonText ? (
              /* Option C: Horizontal Text Action Button */
              <View
                className="px-3.5 py-2 rounded-xl items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <Text className="text-[10px] font-black text-white tracking-wider uppercase">
                  {mode.buttonText}
                </Text>
              </View>
            ) : (
              <View
                className="rounded-xl p-1"
                style={{ backgroundColor: theme.iconBg }}
              >
                <Icon
                  name="chevron-right"
                  size={width * 0.05}
                  style={{ color: theme.iconText }}
                />
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
