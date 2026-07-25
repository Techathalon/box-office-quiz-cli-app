import React, { useState } from 'react';
import { View, Text, Modal, Dimensions } from 'react-native';
import { MotiView, MotiText } from 'moti';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useTheme } from '../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CoinRewardModalProps {
  isVisible: boolean;
  existCoins: number;
  addCoins: number;
  onClose: (newTotal: number) => void;
}

export const CoinRewardModal: React.FC<CoinRewardModalProps> = ({
  isVisible,
  existCoins,
  addCoins,
  onClose,
}) => {
  const { theme } = useTheme();
  const [leftX, setLeftX] = useState(0);
  const [rightX, setRightX] = useState(0);
  const [displayCoins, setDisplayCoins] = useState(existCoins);
  const travelDistance = rightX - leftX;
  const coinsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const handleIncrement = () => {
    if (!isVisible) {
      setDisplayCoins(existCoins);
      return;
    }
    const initialDelay = 4000;
    const targetTotal = existCoins + addCoins;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayCoins(prevCoins => {
          if (prevCoins >= targetTotal) {
            clearInterval(interval);
            return targetTotal;
          }
          return prevCoins + 1;
        });
      }, 600);

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(timer);
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      {/* Dark Overlay */}
      <View className="flex-1 bg-black/60 justify-center items-center">
        {/* Celebration Confetti */}
        {isVisible && (
          <ConfettiCannon
            count={70}
            origin={{ x: SCREEN_WIDTH / 2, y: -20 }}
            fallSpeed={2400}
            fadeOut
          />
        )}

        {/* Modal Center Card */}
        <View
          className="w-[88%]  border border-white/10 rounded-3xl p-6 items-center shadow-2xl relative z-40"
          style={{ backgroundColor: `${theme.primaryYellow}4D` }}
        >
          <Text
            className="font-bold text-[14px] mt-1 mb-6 uppercase tracking-widest"
            style={{ color: `${theme.secondaryYellow}` || '#A1A1AA' }}
          >
            Level Complete
          </Text>

          <View className="w-full h-32 bg-amber-500/10 rounded-2xl border border-white/10 flex-row items-center justify-between px-6 relative my-2 overflow-visible">
            <View
              onLayout={e => setLeftX(e.nativeEvent.layout.x)}
              className="items-center z-20"
            >
              <View className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/50 items-center justify-center mb-1">
                <MaterialIcons
                  name="monetization-on"
                  size={SCREEN_WIDTH * 0.08}
                  color={theme.primaryYellow || '#111827'}
                />
              </View>
              <Text
                className="font-extrabold text-[14px] tracking-wider"
                style={{ color: theme.secondaryYellow || '#111827' }}
              >
                +{addCoins} EARNED
              </Text>
            </View>

            {isVisible && travelDistance > 0 && (
              <View
                style={{ left: leftX + 12 }}
                className="absolute top-8 bottom-0 z-30 pointer-events-none"
              >
                {coinsArray.map(index => {
                  const delay = 400 + index * 200;

                  return (
                    <MotiView
                      key={index}
                      from={{
                        translateX: 0,
                        translateY: 0,
                        scale: 0.2,
                        opacity: 0,
                      }}
                      animate={{
                        translateX: [0, travelDistance / 2, travelDistance], // Exact left to right flight
                        translateY: [0, -32, 0], // Smooth parabolic arc jump UP and down
                        scale: [0.4, 1.3, 0.3], // Pops up bigger mid-air, shrinks into target
                        opacity: [0, 1, 1, 0], // Fades in at start, fades out inside wallet
                      }}
                      transition={{
                        type: 'timing',
                        duration: 650,
                        delay: delay,
                      }}
                      onDidAnimate={(key, finished) => {
                        if (finished && key === 'translateX') {
                          handleIncrement();
                          if (displayCoins === existCoins + addCoins) {
                            onClose(displayCoins);
                          }
                        }
                      }}
                      style={{ position: 'absolute' }}
                    >
                      <MaterialIcons
                        name="monetization-on"
                        size={28}
                        color="#FFD700"
                      />
                    </MotiView>
                  );
                })}
              </View>
            )}
            <MotiView
              onLayout={e => setRightX(e.nativeEvent.layout.x)}
              // from={{ opacity: 0, scale: 0.2 }}
              // animate={{
              //   opacity: 1,
              //   scale: 1,
              // }}
              // transition={{ type: 'spring', damping: 10 }}
              className="items-center z-20"
            >
              <View className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-400 items-center justify-center mb-1 shadow-lg shadow-amber-500/40">
                <MaterialIcons
                  key={displayCoins}
                  name="monetization-on"
                  size={SCREEN_WIDTH * 0.09}
                  color={theme.primaryYellow || '#111827'}
                />
              </View>
              <MotiText className="text-white font-black text-[14px] tracking-wider">
                {displayCoins}
              </MotiText>
            </MotiView>
          </View>
        </View>
      </View>
    </Modal>
  );
};
