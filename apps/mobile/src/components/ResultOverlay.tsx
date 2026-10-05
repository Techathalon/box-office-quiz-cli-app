import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  StyleSheet,
} from 'react-native';
import { View as MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { getUserProgress } from '../services/api';
import { CoinRewardModal } from './CoinRewardModal';
import { useTheme } from '../hooks/useTheme';
import { calculateUserRewards } from '../utils/game.util';
import { useAuth } from '../hooks/useAuth';
// 1. Switch import to the infinite streaming package
import Confetti from 'react-native-confetti';
import useSound from '../hooks/useSound';
import { UserProgress } from '../types/type';
import AppLayout from './AppLayout';
import { styles } from './style';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  InterstitialAd,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const { width } = Dimensions.get('window');

interface ResultOverlayProps {
  isVisible: boolean;
  hasWon: boolean;
  correctAnswer: string;
  currentLevel: number;
  onNext: () => void;
}

export default function ResultOverlay({
  isVisible,
  hasWon,
  correctAnswer,
  currentLevel,
  onNext,
}: ResultOverlayProps) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const confettiRef = useRef<any>(null);
  const navigation = useNavigation();
  const nextLevel = currentLevel + 1;
  const { playSound, stopSound } = useSound();
  const [showCoinModal, setShowCoinModal] = React.useState(false);
  const [userProgress, setUserProgress] = React.useState<UserProgress>();
  const [loaded, setLoaded] = React.useState(false);
  const [interstitialAdLoaded, setInterstitialAdLoaded] = React.useState(false);
  const interstitialAdRef = useRef<InterstitialAd | null>(null);
  const rewardedAdRef = useRef<RewardedAd | null>(null);

  useEffect(() => {
    let confettiInterval: any;
    let soundInterval: any;
    const currentConfetti = confettiRef.current;

    // 2. Wait until the modal is actually visible before kicking off the loop
    if (isVisible && hasWon && currentConfetti) {
      currentConfetti.startConfetti();
      playSound('confetti_sound.mp3');
      soundInterval = setInterval(() => {
        if (showCoinModal) {
          clearInterval(soundInterval);
          stopSound('confetti_sound.mp3');
        }

        stopSound('confetti_sound.mp3');
        playSound('confetti_sound.mp3');
      }, 9000);
      confettiInterval = setInterval(() => {
        if (showCoinModal) {
          clearInterval(confettiInterval);
          stopSound('confetti_sound.mp3');
        }

        currentConfetti.startConfetti();
      }, 1000);
    } else if (isVisible && !hasWon) {
      playSound('wrong_next_level_sound.mp3');
    }

    return () => {
      if (confettiInterval) {
        clearInterval(confettiInterval);
        stopSound('confetti_sound.mp3');
      }
      if (soundInterval || showCoinModal) {
        clearInterval(soundInterval);
        stopSound('wrong_next_level_sound.mp3');
      }
      currentConfetti?.stopConfetti();
      stopSound('confetti_sound.mp3');
      stopSound('wrong_next_level_sound.mp3');
    };
  }, [isVisible, hasWon, playSound, stopSound, showCoinModal]);
  useEffect(() => {
    if (!user || !isVisible || !hasWon) {
      return;
    }
    const fetchUserProgress = async () => {
      try {
        if (isVisible && hasWon) {
          const res = await getUserProgress(user?.id as number);
          setUserProgress(res.userProgress);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProgress();
  }, [user, isVisible, hasWon]);

  const loadNewRewardedAd = useCallback(() => {
    setLoaded(false);

    const adInstance = RewardedAd.createForAdRequest(adUnitId, {
      keywords: ['fashion', 'clothing'],
    });

    const unsubscribeLoaded = adInstance.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeEarned = adInstance.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward:', reward);
      },
    );

    const unsubscribeClosed = adInstance.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        setShowCoinModal(true); // Open rewards modal after ad is closed
      },
    );

    const unsubscribeError = adInstance.addAdEventListener(
      AdEventType.ERROR,
      error => {
        console.warn('Rewarded Ad Error:', error.message);
        setLoaded(false);
      },
    );

    adInstance.load();
    rewardedAdRef.current = adInstance;

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  const loadNewInterstitialAd = useCallback(() => {
    setInterstitialAdLoaded(false);

    const interstitialAdInstance = InterstitialAd.createForAdRequest(
      interstitialAdUnitId,
      {
        keywords: ['gaming', 'entertainment'],
      },
    );

    const unsubscribeLoaded = interstitialAdInstance.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialAdLoaded(true);
      },
    );

    const unsubscribeClosed = interstitialAdInstance.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialAdLoaded(false);
        onNext(); // Proceed to the next level after the interstitial ad is closed
      },
    );

    const unsubscribeError = interstitialAdInstance.addAdEventListener(
      AdEventType.ERROR,
      error => {
        console.warn('Interstitial Ad Error:', error.message);
        setInterstitialAdLoaded(false);
      },
    );

    interstitialAdInstance.load();
    interstitialAdRef.current = interstitialAdInstance;

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, [onNext]);
  useEffect(() => {
    if (isVisible) {
      const cleanupInterstitial = loadNewInterstitialAd();
      const cleanupListeners = loadNewRewardedAd();
      return () => {
        cleanupListeners();
        cleanupInterstitial();
      };
    }
  }, [isVisible, loadNewRewardedAd, loadNewInterstitialAd]);

  const rewards = useMemo(() => {
    if (!userProgress) {
      return;
    }
    if (hasWon) {
      return calculateUserRewards(
        userProgress?.wonCount - 1 || 0,
        userProgress?.lostCount || 0,
      );
    }
  }, [userProgress, hasWon]);

  const handleNext = () => {
    if (hasWon) {
      if (loaded && rewardedAdRef.current) {
        rewardedAdRef.current.show();
      } else {
        setShowCoinModal(true);
      }
    } else {
      if (interstitialAdLoaded && interstitialAdRef.current) {
        interstitialAdRef.current.show();
      } else {
        onNext();
      }
    }
  };
  const handleCloseCoinModal = () => {
    setShowCoinModal(false);
    onNext();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => {
        navigation.goBack();
      }}
    >
      <AppLayout>
        <View className="flex-1 " style={StyleSheet.absoluteFill}>
          <View className="flex-1 w-full justify-center items-center">
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'timing', duration: 250 }}
              className="py-12 gap-9 px-9 items-center w-fulljustify-center"
            >
              {/* --- Top Decorative Status Indicator Area --- */}
              <View className="w-full items-center mt-5">
                <MotiView
                  from={{ scale: 0.4, rotate: '-10deg' }}
                  animate={{ scale: 1, rotate: '0deg' }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  {hasWon ? (
                    <Image
                      source={require('../../assets/winning_image.png')}
                      style={{ width: width, height: width * 0.55 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require('../../assets/losing_image.png')}
                      style={{ width: width, height: width * 0.55 }}
                      resizeMode="contain"
                    />
                  )}
                </MotiView>
              </View>

              {/* --- Center Evaluation Content Module --- */}
              <View className="w-full items-center mt-5 gap-9">
                <MotiView
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'spring', delay: 200 }}
                  className="w-full p-6 my-auto items-center bg-zinc-900/55 rounded-3xl"
                >
                  <View className="flex items-center justify-between w-full px-2 gap-2">
                    <View>
                      <Text
                        className="text-gray-400  font-bold tracking-[0.1em] uppercase mb-1"
                        style={styles.iconText}
                      >
                        ★ Lights Camera Action ★
                      </Text>
                    </View>
                    <View className="flex-row items-center w-full justify-between px-2">
                      <View className="flex-row items-center">
                        <View
                          className="p-2.5 rounded-xl mr-3"
                          style={{ backgroundColor: theme.iconBg }}
                        >
                          <Feather
                            name="award"
                            style={[styles.iconSize, { color: theme.iconText }]}
                          />
                        </View>
                        <View>
                          <Text
                            className="font-black tracking-tighter text-center uppercase"
                            style={[
                              styles.littleLargeTitleSize,
                              { color: theme.primaryYellow || '#FFCC00' },
                            ]}
                          >
                            Finished
                          </Text>
                          <Text
                            className="font-black text-white"
                            style={styles.titleSize}
                          >
                            Level {currentLevel}
                          </Text>
                        </View>
                      </View>

                      <Feather
                        name="chevrons-right"
                        size={width * 0.07}
                        color="#9CA3AF"
                      />

                      <View className="flex-row items-center">
                        <View
                          className="p-2.5 rounded-xl mr-3"
                          style={{ backgroundColor: theme.iconBg }}
                        >
                          <Feather
                            name="trending-up"
                            size={width * 0.08}
                            color={theme.iconText}
                          />
                        </View>
                        <View>
                          <Text
                            className=" font-black tracking-tighter text-center uppercase"
                            style={[
                              styles.littleLargeTitleSize,
                              { color: theme.primaryYellow || '#FFCC00' },
                            ]}
                          >
                            Next Target
                          </Text>
                          <Text
                            className=" font-black text-white"
                            style={styles.titleSize}
                          >
                            Level {nextLevel}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {!hasWon && (
                      <View className="w-full mt-4 border border-zinc-700/50 rounded-2xl p-4 bg-zinc-950/40 items-center">
                        <Text
                          className=" text-gray-400 font-black tracking-widest uppercase mb-1.5"
                          style={styles.titleSize}
                        >
                          Correct Sequence
                        </Text>
                        <Text
                          className=" font-black text-center px-1"
                          style={[
                            styles.titleSize,
                            { color: theme.lightskyprimary || '#0EA5E9' },
                          ]}
                        >
                          "{correctAnswer}"
                        </Text>
                      </View>
                    )}
                  </View>
                </MotiView>

                {/* --- Action Interaction Button Row Module --- */}
                <MotiView
                  from={{ opacity: 0, translateY: 30 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'spring', delay: 400 }}
                  className="w-full flex-row  items-center gap-3"
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                    className="flex-1 py-4 rounded-2xl items-center justify-center flex-row shadow-sm "
                    style={{ backgroundColor: theme.lightskyprimary }}
                  >
                    <Feather
                      name="grid"
                      style={[styles.iconSize, { color: '#4B5563' }]}
                      className="mr-2"
                    />
                    <Text
                      className="text-zinc-600 font-black  tracking-wide uppercase ml-1"
                      style={styles.titleSize}
                    >
                      Levels
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleNext}
                    className="flex-1 py-4 rounded-2xl items-center justify-center flex-row shadow-md "
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Text
                      className="text-white font-black  tracking-wide mr-1 uppercase"
                      style={styles.titleSize}
                    >
                      Level {nextLevel}
                    </Text>
                    <Feather
                      name="arrow-right"
                      style={[styles.iconSize, { color: theme.white }]}
                      strokeWidth={3}
                    />
                  </TouchableOpacity>
                </MotiView>
              </View>
            </MotiView>
          </View>
          {rewards && hasWon && showCoinModal && (
            <CoinRewardModal
              isVisible={showCoinModal}
              existCoins={rewards.coins}
              addCoins={10}
              onClose={() => handleCloseCoinModal()}
            />
          )}

          {/* 3. Replaced ConfettiCannon component with the stream component */}
          {hasWon && !showCoinModal && (
            <Confetti
              ref={confettiRef}
              confettiCount={100}
              timeout={40}
              colors={[
                theme.primary,
                '#0EA5E9',
                '#FFFFFF',
                '#FFCC00',
                '#F59E0B',
                '#EF4444',
                '#22C55E',
                '#3B82F6',
                '#8B5CF6',
                '#EC4899',
              ]}
            />
          )}
        </View>
      </AppLayout>
    </Modal>
  );
}
