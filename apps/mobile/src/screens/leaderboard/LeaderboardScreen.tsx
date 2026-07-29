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
        paddingHorizontal: 12,
        paddingVertical: 12,
        alignItems: 'center',
        gap: 8,
      }}
      style={{
        backgroundColor: theme.card || '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: theme.border || '#E5E7EB',
        maxHeight: 80,
      }}
    >
      {TABS.map((tab, idx) => {
        const isActive = activeTab === idx;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => handleTabPress(idx)}
            activeOpacity={0.8}
            className="flex-row items-center justify-center px-5 py-3 rounded-full"
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
                  marginRight: 6,
                }}
              >
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={18}
                  color={isActive ? theme.white : theme.primary || '#6B7280'}
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    includeFontPadding: false,
                  }}
                />
              </View>
            )}

            <Text
              className="text-[13px] font-bold "
              style={{ color: isActive ? theme.white : theme.primary }}
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
      <View
        className="pt-6  px-4 items-center justify-center border-b mb-4"
        style={{
          backgroundColor: theme.surface || '#FAFAFA',
          borderColor: theme.border || '#E5E7EB',
        }}
      >
        <Text
          className="text-center font-black text-[13px] uppercase tracking-widest mb-6"
          style={{ color: theme.textSecondary || '#6B7280' }}
        >
          🏆 Top Champions
        </Text>

        <View className="flex-row items-end justify-center w-full px-2">
          {podiumOrder.map((user, idx) => {
            const svgCode = multiavatar(user?.avatar || 'Binx Bond');
            if (!user) {
              return <View key={idx} style={{ width: width * 0.28 }} />;
            }

            const isFirst = user.rank === 1;
            const isSecond = user.rank === 2;

            // 1. Heights for the physical steps underneath
            // Center (#1) = 75px, Left (#2) = 50px, Right (#3) = 35px
            const stepHeight = isFirst
              ? height * 0.098
              : isSecond
              ? height * 0.07
              : height * 0.05;

            const sizeMultiplier = width * 0.002;
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
                from={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: idx * 100, type: 'timing' }}
                className="items-center mx-1"
                style={{ width: width * 0.28 }}
              >
                {/* Top Crown for Rank 1 */}
                <View className="flex-row">
                  <Text
                    className="pr-2 font-black text-[15px]"
                    style={{ color: theme.primaryYellow }}
                  >
                    {coins}
                  </Text>
                  <FontAwesome5
                    name="coins"
                    size={width * 0.05}
                    color={theme.primaryYellow}
                    style={{ marginBottom: -6, zIndex: 10 }}
                  />
                </View>

                {isFirst ? (
                  <MaterialCommunityIcons
                    name="crown"
                    size={width * 0.15}
                    color={crownColor}
                    style={{ marginBottom: -6, zIndex: 10 }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="crown-outline"
                    size={width * 0.15}
                    color={crownColor}
                    style={{ marginBottom: -6, zIndex: 10 }}
                  />
                )}

                {/* Avatar Ring */}
                <View
                  className="rounded-full items-center justify-center z-10"
                  style={[
                    styles.podiumRing,
                    {
                      borderColor: crownColor,
                      width: 76 * sizeMultiplier,
                      height: 76 * sizeMultiplier,
                      borderWidth: isFirst ? 4 : 4,
                    },
                  ]}
                >
                  {/* {renderAvatar(user.avatar, 68 * sizeMultiplier)} */}
                  <SvgXml xml={svgCode} />

                  {/* Rank Badge */}
                  <View
                    className="absolute -bottom-2 rounded-full px-2 py-0.5"
                    style={{ backgroundColor: crownColor }}
                  >
                    <Text className="text-[15px] font-black text-white">
                      {user.rank}
                    </Text>
                  </View>
                </View>

                {/* User Details */}
                <Text
                  className="text-[13px] font-bold mt-3 text-center px-1"
                  numberOfLines={1}
                  style={{ color: theme.text || '#111827' }}
                >
                  {user.name}
                </Text>

                <View className="flex-row items-center mt-0.5 mb-2">
                  <MaterialCommunityIcons
                    name="trophy"
                    size={width * 0.05}
                    color={crownColor}
                  />
                  <Text
                    className="text-[13px] font-black ml-1"
                    style={{ color: theme.primaryYellowDark || '#D97706' }}
                  >
                    {user.wonCount || 0} Wins
                  </Text>
                  <Text
                    className="text-[14px] font-black ml-1"
                    style={{ color: theme.text || '#111827' }}
                  >
                    {winRatePercentage}%
                  </Text>
                </View>

                {/* Physical Step / Stand Base */}
                <View
                  className="w-full rounded-t-2xl items-center justify-center border-t border-x"
                  style={{
                    borderTopWidth: 8,
                    height: stepHeight,
                    backgroundColor: isFirst
                      ? `${theme.lightskyprimary}`
                      : `${theme.white}`,
                    borderColor: crownColor,
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="pr-2">
                      {awardTitle === 'Diamond' || awardTitle === 'Novice' ? (
                        <MaterialCommunityIcons
                          name={iconName}
                          size={width * 0.05}
                          color={awardBadgeColor}
                        />
                      ) : (
                        <FontAwesome5
                          name={iconName}
                          size={width * 0.05}
                          color={awardBadgeColor}
                        />
                      )}
                    </View>
                    <Text
                      className="font-black text-[20px] opacity-40"
                      style={{ color: isFirst ? theme.primary : theme.text }}
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
          className="text-[15px] font-black w-8 text-center"
          style={{ color: theme.textSecondary || '#6B7280' }}
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
            className="text-[14px] font-bold"
            numberOfLines={1}
            style={{ color: theme.text || '#111827' }}
          >
            {item.name}
          </Text>
          <View className="flex-row items-center mt-0.5">
            <Text
              className="text-[14px] font-semibold"
              style={{ color: theme.success || '#10B981' }}
            >
              {item.wonCount || 0} Wins
            </Text>
            <Text
              className="text-[10px] mx-1.5"
              style={{ color: theme.textSecondary }}
            >
              •
            </Text>
            <Text
              className="text-[13px] font-medium"
              style={{ color: theme.textSecondary || '#6B7280' }}
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
                size={width * 0.05}
                color={awardBadgeColor}
              />
            ) : (
              <FontAwesome5
                name={iconName}
                size={width * 0.05}
                color={awardBadgeColor}
              />
            )}
          </View>
          <View className="flex-row ">
            <Text
              className="pr-2 text-[16px] font-black"
              style={{ color: theme.primaryYellow || '#111827' }}
            >
              {' '}
              {coins}
            </Text>
            <FontAwesome5
              name="coins"
              size={width * 0.05}
              color={theme.primaryYellow || '#D1D5DB'}
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
    <SafeAreaView className="flex-1 pb-9">
      <View>{renderTabs()}</View>

      <View>{renderPodium()}</View>

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
