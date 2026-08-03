import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View as MotiView } from 'moti';

// Using your exact installed icon packages
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getLevelsForMode } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../../components/style';

export default function LevelSelectionScreen({ route, navigation }: any) {
  const { mode, title } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [wonList, setWonList] = useState<number[]>([]);
  const [lostList, setLostList] = useState<number[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(1);

  useFocusEffect(
    useCallback(() => {
      async function fetchProgress() {
        try {
          if (!user?.id) {
            return;
          }
          setLoading(true);
          const res = await getLevelsForMode(user?.id as number, mode);
          console.log('res:', res);
          if (res.success) {
            const data = await res.levels.levels;
            console.log('data:', data);
            setCurrentLevel(Number(data.currentLevel) || 1);
            setWonList((data.levelsWon || []).map(Number));
            setLostList((data.levelsLost || []).map(Number));
            setQuestionCount(Number(res.levels.questionCount) || 1);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      fetchProgress();
    }, [mode, user?.id]),
  );

  if (loading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: '#09090b' }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const completedCount = wonList.length;
  const progressPercent = Math.min(
    Math.round((completedCount / questionCount) * 100),
    100,
  );

  return (
    <>
      <View className="absolute inset-0 " />

      <SafeAreaView className="flex-1">
        {/* Sleek Minimalist Navbar */}
        <View className="px-6 py-4 flex-row items-center border-b border-white/10 backdrop-blur-md">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full border border-white/10 active:bg-white/20"
            style={{ backgroundColor: theme.iconBg }}
          >
            <Feather
              name="arrow-left"
              style={[styles.iconSize, { color: theme.iconText }]}
            />
          </TouchableOpacity>
          <Text
            className=" font-black tracking-wide ml-4  uppercase"
            style={[styles.largeTitleSize, { color: theme.text }]}
          >
            {title}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Moti Animated Campaign Card */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 400 }}
            className="mb-8 p-5 rounded-3xl border border-white/10 bg-zinc-900/55"
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Text
                  className=" font-medium  uppercase tracking-wider ml-2"
                  style={[styles.titleSize, { color: theme.lightskyprimary }]}
                >
                  Campaign Progress
                </Text>
              </View>
              <Text
                className=" font-black "
                style={[styles.iconText, { color: theme.iconText }]}
              >
                {progressPercent}%
              </Text>
            </View>
            <View className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <MotiView
                from={{ width: '0%' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ type: 'spring', damping: 15 }}
                className="h-full bg-amber-500 rounded-full"
              />
            </View>
            <View className="flex-row justify-between mt-4">
              <Text style={[styles.titleSize, { color: theme.white }]}>
                Cleared:{' '}
                <Text className="text-green-400 font-bold">
                  {completedCount}
                </Text>
              </Text>
              <Text style={[styles.titleSize, { color: theme.white }]}>
                Failed:{' '}
                <Text className="text-rose-400 font-bold">
                  {lostList.length}
                </Text>
              </Text>
              <Text style={[styles.titleSize, { color: theme.white }]}>
                Total:{' '}
                <Text className="text-white font-bold">{questionCount}</Text>
              </Text>
            </View>
          </MotiView>

          {/* Level Grid - Balanced Row layout spacing */}
          <View className="flex-row flex-wrap justify-between row-gap-4">
            {Array.from({ length: questionCount }, (_, i) => {
              const levelNum = i + 1;
              const isUnlocked = levelNum <= currentLevel;
              const isWon = wonList.includes(levelNum);
              const isLost = lostList.includes(levelNum);
              const isCurrent = levelNum === currentLevel;

              // Solid, soft palette stylings with layout parameters
              let cardBg = 'bg-zinc-800';
              let borderColor = 'border-zinc-700';
              let textColor = 'text-zinc-400';
              let centerIcon = null;

              if (isWon) {
                cardBg = 'bg-emerald-100';
                borderColor = 'border-emerald-400';
                textColor = 'text-emerald-800';
                centerIcon = (
                  <MaterialIcons
                    name="check-circle"
                    style={[styles.iconSize, { color: '#047857' }]}
                  />
                );
              } else if (isLost) {
                cardBg = 'bg-rose-100';
                borderColor = 'border-rose-400';
                textColor = 'text-rose-800';
                centerIcon = (
                  <MaterialIcons
                    name="error"
                    style={[styles.iconSize, { color: '#B91C1C' }]}
                  />
                );
              } else if (isCurrent) {
                cardBg = 'bg-amber-100';
                borderColor = 'border-amber-500';
                textColor = 'text-amber-800';
                centerIcon = (
                  <Feather
                    name="play"
                    style={[styles.iconSize, { color: '#B45309' }]}
                  />
                );
              } else if (!isUnlocked) {
                cardBg = 'bg-zinc-900';
                borderColor = 'border-zinc-800';
                textColor = 'text-zinc-600';
                centerIcon = (
                  <Feather
                    name="lock"
                    style={[styles.iconSize, { color: '#4B5563' }]}
                  />
                );
              }

              return (
                <MotiView
                  key={levelNum}
                  from={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', delay: Math.min(i * 25, 300) }}
                  className="w-[23%] aspect-square mb-4"
                >
                  <MotiView
                    animate={{ scale: isCurrent ? [1, 1.04, 1] : 1 }}
                    transition={{
                      type: 'timing',
                      duration: 2000,
                      loop: isCurrent,
                    }}
                    className="w-full h-full"
                  >
                    <TouchableOpacity
                      disabled={!isUnlocked}
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate('GameplayScreen', {
                          mode,
                          level: levelNum,
                        })
                      }
                      className={`w-full h-full rounded-2xl items-center justify-center border-2 flex-col space-y-1 ${cardBg} ${borderColor}`}
                    >
                      {centerIcon}
                      <Text
                        className={` font-black tracking-tight ${textColor}`}
                        style={[styles.titleSize]}
                      >
                        {levelNum}
                      </Text>
                    </TouchableOpacity>
                  </MotiView>
                </MotiView>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
