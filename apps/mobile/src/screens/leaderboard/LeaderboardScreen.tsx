import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View as MotiView } from 'moti';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { calculateUserRewards } from '../../utils/game.util';
import { SvgXml } from 'react-native-svg';
import multiavatar from '@multiavatar/multiavatar/esm';

import { getAllUsersWithProgress } from '../../services/api';
import { useTheme } from '../../hooks/useTheme';
import { User, GameMode } from '../../types/type';
import { styles as commonStyles } from '../../components/style';
const { width, height } = Dimensions.get('window');
const PAGE_SIZE = 15;

export interface RankUser extends User {
  rank: number;
}

const TABS: { key: string; title: string; icon: string; mode?: GameMode }[] = [
  { key: 'global', title: 'Global', icon: 'earth', mode: undefined },
  {
    key: 'blurred',
    title: 'Blurred',
    icon: 'eye-off',
    mode: GameMode.BLURRED_POSTER,
  },
  {
    key: 'emoji',
    title: 'Emoji',
    icon: 'emoticon-outline',
    mode: GameMode.EMOJI_RIDDLES,
  },
  {
    key: 'letter',
    title: 'Letter',
    icon: 'format-letter-case',
    mode: GameMode.LETTER_PUZZLE,
  },
  {
    key: 'dialogue',
    title: 'Dialogue',
    icon: 'chat-processing-outline',
    mode: GameMode.DIALOGUE_GURU,
  },
  {
    key: 'spot',
    title: 'Spot',
    icon: 'eye-off',
    mode: GameMode.SPOT_THE_EXACT,
  },
  {
    key: 'missing',
    title: 'Missing',
    icon: 'format-letter-case',
    mode: GameMode.MISSING_LETTERS,
  },
];

export default function LeaderboardScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [leaderboardData, setLeaderboardData] = useState<RankUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const topThree = leaderboardData.slice(0, 3);
  const otherPlayers = leaderboardData.slice(3);

  const fetchLeaderboard = useCallback(
    async (
      tabIndex: number,
      pageNum: number,
      isRefresh: boolean = false,
      isLoadMore: boolean = false,
    ) => {
      if (isLoadMore) {
        setLoadingMore(true);
      } else if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const activeMode = TABS[tabIndex].mode;
        const data = await getAllUsersWithProgress(
          pageNum,
          PAGE_SIZE,
          activeMode,
        );

        if (data?.usersWithProgress?.users) {
          const rawUsers: User[] = data.usersWithProgress.users;

          // Attach calculated numerical ranks
          const rankedUsers: RankUser[] = rawUsers.map((user, index) => ({
            ...user,
            rank: (pageNum - 1) * PAGE_SIZE + index + 1,
          }));

          setLeaderboardData(prev =>
            pageNum === 1 ? rankedUsers : [...prev, ...rankedUsers],
          );

          setHasMore(data.usersWithProgress?.pagination?.hasMore ?? false);
        } else {
          if (pageNum === 1) setLeaderboardData([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error('Leaderboard Fetch Error:', error);
        if (pageNum === 1) setLeaderboardData([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchLeaderboard(activeTab, page);
  }, [activeTab, page, fetchLeaderboard]);

  const handleTabPress = (index: number) => {
    if (index === activeTab) return;
    setActiveTab(index);
    setPage(1);
    setLeaderboardData([]);
  };

  const handleRefresh = () => {
    setPage(1);
    fetchLeaderboard(activeTab, 1, true, false);
  };

  const handleLoadMore = () => {
    if (!loadingMore && !loading && !refreshing && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLeaderboard(activeTab, nextPage, false, true);
    }
  };

  // Helper function to safely render Emoji OR URL avatars
  // const renderAvatar = (avatar?: string, size: number = 48) => {
  //   const isUrl = avatar && avatar.startsWith('http');
  //   if (isUrl) {
  //     return (
  //       <Image
  //         source={{ uri: avatar }}
  //         style={{ width: size, height: size, borderRadius: size / 2 }}
  //       />
  //     );
  //   }

  //   return (
  //     <View
  //       className="justify-center items-center rounded-full"
  //       style={{
  //         width: size,
  //         height: size,
  //         backgroundColor: theme.lightskyprimary || '#F0F9FF',
  //       }}
  //     >
  //       <Text style={{ fontSize: size * 0.5 }}>{avatar || '👤'}</Text>
  //     </View>
  //   );
  // };

  const renderTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.01,
        alignItems: 'center',
        gap: width * 0.02,
        height: height * 0.08,
      }}
      style={{
        backgroundColor: theme.card || '#FFFFFF',
        borderBottomWidth: width * 0.001,
        borderBottomColor: theme.border || '#E5E7EB',
        maxHeight: height * 0.08,
      }}
    >
      {TABS.map((tab, idx) => {
        const isActive = activeTab === idx;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => handleTabPress(idx)}
            activeOpacity={0.8}
            className="flex-row items-center justify-center px-5 py-1 rounded-full"
            style={{
              backgroundColor: isActive
                ? theme.primary || '#3B82F6'
                : theme.lightskyprimary || '#F0F9FF',
            }}
          >
            {tab.icon && (
              <View
                className="items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${theme.primary}4D`,
                  width: width * 0.08,
                  height: height * 0.04,
                  marginRight: width * 0.02,
                }}
              >
                <MaterialCommunityIcons
                  name={tab.icon}
                  color={isActive ? theme.white : theme.primary || '#6B7280'}
                  style={[
                    commonStyles.iconSize,
                    {
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      includeFontPadding: false,
                    },
                  ]}
                />
              </View>
            )}

            <Text
              className=" font-bold "
              style={[
                commonStyles.titleSize,
                { color: isActive ? theme.white : theme.primary },
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
  const renderPodium = () => {
    if (topThree.length === 0) return null;
    const podiumOrder: (RankUser | null)[] = [
      topThree[1] || null,
      topThree[0] || null,
      topThree[2] || null,
    ];

    return (
      // Outer Container filling parent flex-[42]
      <View
        className="flex-1  px-2 items-center justify-between border-b"
        style={{
          backgroundColor: theme.surface || '#FAFAFA',
          borderColor: theme.border || '#E5E7EB',
        }}
      >
        {/* Title Header */}
        <View className=" flex-[8] justify-center items-center">
          <Text
            className="text-center font-black  uppercase tracking-widest"
            style={[
              commonStyles.titleSize,
              { color: theme.textSecondary || '#6B7280' },
            ]}
          >
            🏆 Top Champions
          </Text>
        </View>

        {/* Podium Cards Row */}
        <View className=" flex-[92] flex-row items-end justify-center w-full mt-3 px-1">
          {podiumOrder.map((user, idx) => {
            if (!user) {
              return <View key={idx} className="w-[30%]" />;
            }

            const svgCode = multiavatar(user?.avatar || 'Binx Bond');
            const isFirst = user.rank === 1;
            const isSecond = user.rank === 2;

            const crownColor = isFirst
              ? '#FFD700'
              : isSecond
              ? '#C0C0C0'
              : '#CD7F32';

            const {
              coins,
              winRatePercentage,
              iconName,
              awardBadgeColor,
              awardTitle,
            } = calculateUserRewards(user.wonCount || 0, user.lostCount || 0);

            return (
              <MotiView
                key={user.userId || idx}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: idx * 100, type: 'timing' }}
                className="items-center w-[31%] flex-1 mx-0.5 justify-end"
              >
                {/* FIXED HEIGHT UPPER SECTION: Ensures top info takes uniform baseline */}
                <View
                  className={`items-center justify-end w-full pb-1 ${
                    isFirst ? 'flex-[50]' : isSecond ? 'flex-[62]' : 'flex-[70]'
                  } `}
                >
                  {/* 1. Coins Row */}
                  <View className="flex-row items-center justify-center mb-0.5">
                    <Text
                      className="pr-1 font-black "
                      style={[
                        commonStyles.iconText,
                        {
                          color: theme.primaryYellow,
                        },
                      ]}
                    >
                      {coins}
                    </Text>
                    <FontAwesome5
                      name="coins"
                      style={[
                        commonStyles.iconSize,
                        { color: theme.primaryYellow },
                      ]}
                    />
                  </View>

                  {/* 2. Crown Icon */}
                  <View className="-mb-1 z-10">
                    <MaterialCommunityIcons
                      name={isFirst ? 'crown' : 'crown-outline'}
                      style={[commonStyles.iconSize, { color: crownColor }]}
                    />
                  </View>

                  {/* 3. Avatar Ring */}
                  <View
                    className="rounded-full items-center justify-center z-10 overflow-hidden relative"
                    style={{
                      borderColor: crownColor,
                      width: width * 0.12,
                      height: height * 0.06,
                      borderWidth: width * 0.01,
                    }}
                  >
                    <View className="w-full h-full items-center justify-center">
                      <SvgXml xml={svgCode} width="100%" height="100%" />
                    </View>

                    {/* Rank Badge */}
                    <View
                      className="absolute -bottom-2 rounded-full p-1 z-15 "
                      style={{ backgroundColor: crownColor }}
                    >
                      <Text
                        className=" font-black text-white  z-20"
                        style={commonStyles.textSize}
                      >
                        {user.rank}
                      </Text>
                    </View>
                  </View>

                  {/* 4. User Name */}
                  <Text
                    className=" font-bold mt-1 text-center px-0.5"
                    numberOfLines={1}
                    style={[
                      commonStyles.iconText,
                      { color: theme.text || '#111827' },
                    ]}
                  >
                    {user.name}
                  </Text>

                  {/* 5. Wins & Winrate */}
                  <View className="flex-row items-center my-0.5">
                    <MaterialCommunityIcons
                      name="trophy"
                      style={[commonStyles.iconSize, { color: crownColor }]}
                    />
                    <Text
                      className=" font-black ml-0.5"
                      style={[
                        commonStyles.iconText,
                        { color: theme.primaryYellowDark || '#D97706' },
                      ]}
                    >
                      {user.wonCount || 0}W ({winRatePercentage}%)
                    </Text>
                  </View>
                </View>
                <View
                  className={`w-full rounded-t-xl items-center justify-center border-t ${
                    isFirst ? 'flex-[50]' : isSecond ? 'flex-[38]' : 'flex-[30]'
                  }`}
                  style={{
                    borderTopWidth: width * 0.02,
                    backgroundColor: isFirst
                      ? `${theme.lightskyprimary}`
                      : `${theme.white}`,
                    borderColor: crownColor,
                  }}
                >
                  <View className="flex-row items-center justify-center">
                    <View className="pr-1">
                      {awardTitle === 'Diamond' || awardTitle === 'Novice' ? (
                        <MaterialCommunityIcons
                          name={iconName}
                          style={[
                            commonStyles.iconSize,
                            { color: awardBadgeColor },
                          ]}
                        />
                      ) : (
                        <FontAwesome5
                          name={iconName}
                          style={[
                            commonStyles.iconSize,
                            { color: awardBadgeColor },
                          ]}
                        />
                      )}
                    </View>
                    <Text
                      className="font-black    opacity-40"
                      style={[
                        commonStyles.iconText,
                        {
                          color: isFirst
                            ? theme.primaryDark
                            : theme.primaryYellowDark,
                        },
                      ]}
                    >
                      {user.rank}
                    </Text>
                  </View>
                </View>
              </MotiView>
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = (item: RankUser, index: number) => {
    const { coins, winRatePercentage, awardTitle, awardBadgeColor, iconName } =
      calculateUserRewards(item.wonCount || 0, item.lostCount || 0);
    const svgCode = multiavatar(item.avatar || 'Binx Bond');

    return (
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: (index % PAGE_SIZE) * 20, type: 'timing' }}
        className="flex-row items-center p-3.5 border rounded-2xl mb-2.5 mx-4"
        style={{
          backgroundColor: theme.card || '#FFFFFF',
          borderColor: theme.border || '#E5E7EB',
        }}
      >
        <Text
          className=" font-black w-8 text-center"
          style={[
            commonStyles.titleSize,
            { color: theme.textSecondary || '#6B7280' },
          ]}
        >
          {item.rank}
        </Text>

        <View className="mx-3">
          <Text className="w-10 h-10 rounded-full items-center justify-center">
            <SvgXml xml={svgCode} />
          </Text>
        </View>

        <View className="flex-1">
          <Text
            className=" font-bold"
            numberOfLines={1}
            style={[commonStyles.titleSize, { color: theme.text || '#111827' }]}
          >
            {item.name}
          </Text>
          <View className="flex-row items-center mt-0.5">
            <Text
              className=" font-semibold"
              style={[
                commonStyles.titleSize,
                { color: theme.success || '#10B981' },
              ]}
            >
              {item.wonCount || 0} Wins
            </Text>
            <Text
              className=" mx-1.5"
              style={[commonStyles.textSize, { color: theme.textSecondary }]}
            >
              •
            </Text>
            <Text
              className=" font-medium"
              style={[
                commonStyles.titleSize,
                { color: theme.textSecondary || '#6B7280' },
              ]}
            >
              {winRatePercentage}% Win Rate
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center">
          <View className="pr-2">
            {awardTitle === 'Diamond' || awardTitle === 'Novice' ? (
              <MaterialCommunityIcons
                name={iconName}
                style={[commonStyles.iconSize, { color: awardBadgeColor }]}
              />
            ) : (
              <FontAwesome5
                name={iconName}
                style={[commonStyles.iconSize, { color: awardBadgeColor }]}
              />
            )}
          </View>
          <View className="flex-row ">
            <Text
              className="pr-2  font-black"
              style={[
                commonStyles.titleSize,
                { color: theme.primaryYellow || '#111827' },
              ]}
            >
              {' '}
              {coins}
            </Text>
            <FontAwesome5
              name="coins"
              style={[commonStyles.iconSize, { color: theme.primaryYellow }]}
            />
          </View>
        </View>
      </MotiView>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return <View className="h-6" />;
    return (
      <View className="py-4 justify-center items-center">
        <ActivityIndicator size="small" color={theme.primary || '#3B82F6'} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1  pb-9">
      <View className="flex[8]">{renderTabs()}</View>

      <View className="flex-[42] overflow-hidden">{renderPodium()}</View>

      {loading && leaderboardData.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={theme.primary || '#3B82F6'} />
          <Text
            className="mt-3 text-xs font-semibold"
            style={{ color: theme.textSecondary || '#6B7280' }}
          >
            Fetching champions...
          </Text>
        </View>
      ) : (
        <FlatList
          className="flex-[50] mt-1"
          data={otherPlayers}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, idx) =>
            item.userId ? item.userId.toString() : idx.toString()
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.primary || '#3B82F6']}
              tintColor={theme.primary || '#3B82F6'}
            />
          }
          ListEmptyComponent={
            !loading ? (
              <View className="flex-1 justify-center items-center  px-6  ">
                <MaterialCommunityIcons
                  name="trophy-outline"
                  size={width * 0.1}
                  color={theme.text || '#D1D5DB'}
                />
                <Text
                  className="mt-4 text-[14px] font-black text-center uppercase"
                  style={{ color: theme.text || '#111827' }}
                >
                  No champions in {TABS[activeTab].title} yet
                </Text>
                <Text
                  className="text-[14px] font-bold text-center mt-3 uppercase"
                  style={{ color: theme.iconText || '#6B7280' }}
                >
                  Play games to climb up the leaderboards!
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  podiumRing: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
