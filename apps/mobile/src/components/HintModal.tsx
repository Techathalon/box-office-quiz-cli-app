import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Svg, { Circle } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Circle Dimensions
const CARD_SIZE = width * 0.74;
const STROKE_WIDTH = 5;
const RADIUS = (CARD_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface HintModalProps {
  isVisible: boolean;
  hintTitle: string;
  hintText: string;
  durationSeconds?: number;
  onClose: () => void;
}

export default function HintModal({
  isVisible,
  hintTitle,
  hintText,
  durationSeconds = 6,
  onClose,
}: HintModalProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const { theme } = useTheme();

  // 1. Reset timer whenever modal becomes visible
  useEffect(() => {
    if (isVisible) {
      setTimeLeft(durationSeconds);
    }
  }, [isVisible, durationSeconds]);

  // 2. Countdown Interval Timer
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // 3. Safely call onClose when time reaches 0
  useEffect(() => {
    if (isVisible && timeLeft === 0) {
      const timer = setTimeout(() => {
        onClose();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isVisible, onClose]);

  // Calculate SVG dash offset to shrink border as time decreases
  const progress = timeLeft / durationSeconds;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  // Dynamic border color change based on time remaining
  const getBorderColor = () => {
    if (progress > 0.5) {
      return `${theme.primaryDark}80`;
    } else if (progress > 0.25) {
      return `${theme.primary}80`;
    } else {
      return `${theme.error}80`;
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Semi-transparent backdrop overlay */}
      <View
        className="flex-1 justify-center items-center px-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
      >
        {/* Outer Circular Card Container */}
        <View
          style={[
            styles.circleCard,
            {
              width: CARD_SIZE,
              height: CARD_SIZE,
              // backgroundColor: `${theme.lightskyprimary}`,
              backgroundColor: '#00000080',
            },
          ]}
        >
          {/* Animated Countdown Border Ring */}
          <Svg
            width={CARD_SIZE}
            height={CARD_SIZE}
            viewBox={`0 0 ${CARD_SIZE} ${CARD_SIZE}`}
            style={StyleSheet.absoluteFill}
          >
            {/* Background Track Circle */}
            <Circle
              cx={CARD_SIZE / 2}
              cy={CARD_SIZE / 2}
              r={RADIUS}
              stroke={theme.border}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
            />
            {/* Shrinking Active Border Progress Line */}
            <Circle
              cx={CARD_SIZE / 2}
              cy={CARD_SIZE / 2}
              r={RADIUS}
              stroke={getBorderColor()}
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              origin={`${CARD_SIZE / 2}, ${CARD_SIZE / 2}`}
              rotation="-90"
            />
          </Svg>

          {/* Inner Circular Content - Made background transparent so SVG shows through */}
          <View
            className="flex-1 justify-between items-center rounded-full w-full h-full"
            style={{
              padding: STROKE_WIDTH + 8,
              backgroundColor: 'transparent',
            }}
          >
            {/* Top Close Button */}
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="p-2 rounded-full border shadow-sm"
              style={{
                backgroundColor: theme.iconBg,
                borderColor: theme.border,
              }}
            >
              <Feather name="x" size={width * 0.05} color={theme.iconText} />
            </TouchableOpacity>

            {/* Hint Content Section */}
            <View className="items-center px-3">
              <View
                className="flex-row items-center px-2.5 py-1 rounded-full mb-2 border"
                style={{
                  backgroundColor: theme.iconBg,
                  borderColor: theme.border,
                }}
              >
                <MaterialIcons
                  name="lightbulb"
                  size={width * 0.05}
                  color={theme.iconText}
                />
                <Text
                  className="font-black text-[13px] uppercase tracking-wider ml-1.5"
                  style={{ color: theme.iconText }}
                >
                  {hintTitle}
                </Text>
              </View>

              <Text
                className="font-bold text-center text-[15px] leading-5"
                style={{ color: theme.white }}
              >
                {hintText}
              </Text>
            </View>

            {/* Bottom Countdown Timer Badge */}
            <View
              className="px-3.5 py-1 flex-row items-center rounded-full border shadow-sm"
              style={{
                backgroundColor: theme.iconBg,
                borderColor: theme.primaryYellowDark,
              }}
            >
              <MaterialIcons
                name="timer"
                size={width * 0.05}
                color={theme.iconText}
              />
              <Text
                className="font-black text-[13px] uppercase tracking-wider"
                style={{ color: theme.text }}
              >
                {timeLeft}s
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  circleCard: {
    borderRadius: CARD_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
});
