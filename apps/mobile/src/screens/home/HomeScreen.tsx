import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { formatName } from '../../utils/game.util';
import { useState, useCallback, useMemo } from 'react';
import { UserProgress as User } from '../../types/type';
import { calculateUserRewards } from '../../utils/game.util';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardPage from '../../components/CardPage';
import { Card } from '../../types/type';
import { useAuth } from '../../hooks/useAuth';
import { AppStackParamList } from '../../navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { View as MotiView } from 'moti';
import { getUserProgress } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [userProgress, setUserProgress] = useState<User>();
  useFocusEffect(
    useCallback(() => {
      const fetchUserProgress = async () => {
        if (!user) {
          return;
        }
        try {
          setLoading(true);
          const progress = await getUserProgress(user?.id as number);
          setUserProgress(progress.userProgress);
          console.log('User progress:', progress);
        } catch (error) {
          console.error('Error fetching user progress:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserProgress();
    }, [user]),
  );

  const gameModes: Card[] = [
    {
      id: 1,
      title: 'Blurred Poster',
      desc: 'Guess the classic movie poster. Look closer!',
      icon: 'eye-off',
      characterImg: require('../../../assets/bg_mode_1.png'),
      mode: 'row', // Specify the layout mode for this card
      buttonText: 'Play',
      handlePress: () =>
        navigation.navigate('LevelSelection', {
          mode: 'BLURRED_POSTER',
          title: 'Blurred Poster',
        }),
    },
    {
      id: 2,
      title: 'Emoji Riddles',
      desc: 'Decode the graphics. Match the emojis!',
      icon: 'smile',
      characterImg: require('../../../assets/bg_mode_2.png'),
      mode: 'row', // Specify the layout mode for this card
      buttonText: 'Play',
      handlePress: () =>
        navigation.navigate('LevelSelection', {
          mode: 'EMOJI_RIDDLES',
          title: 'Emoji Riddles',
        }),
    },
    {
      id: 3,
      title: 'Letter Puzzle',
      desc: 'Drag and arrange to spell the name!',
      icon: 'grid',
      characterImg: require('../../../assets/bg_mode_3.png'),
      mode: 'row', // Specify the layout mode for this card
      buttonText: 'Play',
      handlePress: () =>
        navigation.navigate('LevelSelection', {
          mode: 'LETTER_PUZZLE',
          title: 'Letter Puzzle',
        }),
    },
    {
      id: 4,
      title: 'Dialogue Guru',
      desc: 'Recognize the famous iconic lines!',
      icon: 'message-square',
      characterImg: require('../../../assets/bg_mode_4.png'),
      mode: 'row', // Specify the layout mode for this card
      buttonText: 'Play',
      handlePress: () =>
        navigation.navigate('LevelSelection', {
          mode: 'DIALOGUE_GURU',
          title: 'Dialogue Guru',
        }),
    },
    {
      id: 5,
      title: 'Spot the Exact',
      desc: 'Only one title is correct. Tricky typos!',
      icon: 'check-circle',
      characterImg: require('../../../assets/bg_mode_5.png'),
      mode: 'row', // Specify the layout mode for this card
      buttonText: 'Play',
      handlePress: () =>
        navigation.navigate('LevelSelection', {
          mode: 'SPOT_THE_EXACT',
          title: 'Spot the Exact',
        }),
    },
    {
      id: 6,
      title: 'Missing Letters',
      desc: 'Fill the blanks. Type the missing letter!',
      icon: 'edit-3',
      characterImg: require('../../../assets/bg_mode_6.png'),
      mode: 'row', // Specify the layout mode for this card
      buttonText: 'Play',
      handlePress: () =>
        navigation.navigate('LevelSelection', {
          mode: 'MISSING_LETTERS',
          title: 'Missing Letters',
        }),
    },
  ];
  const rewards = useMemo(() => {
    return calculateUserRewards(
      userProgress?.wonCount || 0,
      userProgress?.lostCount || 0,
    );
  }, [userProgress]);
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }
  return (
    <ImageBackground
      source={require('../../../assets/background_bg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="absolute inset-0 bg-black/30">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View className="px-4 pt-4 flex-row justify-between items-center">
            <View className="flex-row items-center space-x-3">
              <View
                className="w-14 h-14 rounded-full border-2 items-center justify-center bg-white"
                style={{ borderColor: theme.border }}
              >
                <Text className="text-2xl">{user?.avatar}</Text>
              </View>
            </View>
            {userProgress && (
              <View className="flex-row items-center space-x-2">
                <View
                  className="flex-row items-center px-2.5 py-1.5 rounded-full border mr-1"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  }}
                >
                  <FontAwesome5
                    name="coins"
                    size={width * 0.05}
                    color="#EAB308"
                  />
                  <Text
                    className="text-[12px] font-black ml-1"
                    style={{ color: theme.primaryYellowDark }}
                  >
                    {rewards.coins} Coins
                  </Text>
                </View>

                <View
                  className="flex-row items-center px-2.5 py-1.5 rounded-full border"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: rewards.awardBadgeColor,
                  }}
                >
                  {rewards.awardTitle === 'Diamond' ||
                  rewards.awardTitle === 'Novice' ? (
                    <MaterialCommunityIcons
                      name={rewards.iconName}
                      size={width * 0.05}
                      color={rewards.awardBadgeColor}
                    />
                  ) : (
                    <FontAwesome5
                      name={rewards.iconName}
                      size={width * 0.05}
                      color={rewards.awardBadgeColor}
                    />
                  )}
                  <Text
                    className="text-[13px] font-bold ml-1"
                    style={{ color: theme.text }}
                  >
                    {rewards.awardTitle} ({userProgress.wonCount} Wins)
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View
            className="m-4 rounded-3xl p-6 relative overflow-hidden bg-white border"
            style={{ borderColor: theme.border }}
          >
            <View className="w-2/3 pr-2">
              <View className="bg-amber-100 self-start px-4 py-1 rounded-md mb-2">
                <Text
                  className="text-[13px] font-bold tracking-wider  uppercase"
                  style={{ color: theme.iconText || '#F59E0B' }}
                >
                  {formatName(user?.name || '')}
                </Text>
              </View>
              <Text
                className="text-2xl font-black mb-1"
                style={{ color: theme.text }}
              >
                Ready for Bollywood Trivia?
              </Text>
              <Text
                className="text-[14px] font-bold leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                Test your cinematic knowledge across 6 custom game modes!
              </Text>
            </View>

            <View className="absolute right-2 top-2 bottom-2 items-center justify-center">
              <View className="w-28 h-28 bg-orange-50 rounded-full items-center justify-center border border-amber-100">
                <Text className="text-6xl animate-bounce">{user?.avatar}</Text>
              </View>
            </View>
          </View>

          {/* --- GAME MODES CONTAINER HEADER --- */}
          <View className="px-4 pt-2 pb-2 flex-row justify-between items-center">
            <Text
              className="text-lg font-extrabold"
              style={{ color: theme.text }}
            >
              Choose Game Mode
            </Text>
            <View
              className="flex-row items-center p-1.5 rounded-xl border border-amber-500/30"
              style={{ backgroundColor: theme.iconBg }}
            >
              <Text
                className="text-xs font-bold"
                style={{ color: theme.iconText }}
              >
                6 Modes Active
              </Text>
            </View>
          </View>
          <View className="px-4 flex-row flex-wrap justify-between">
            {gameModes.map(mode => (
              <MotiView
                key={mode.id}
                from={{ opacity: 0, translateY: 15 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'timing',
                  delay: mode.id * 60,
                  duration: 200,
                }}
              >
                <CardPage key={mode.id} mode={mode} />
              </MotiView>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
