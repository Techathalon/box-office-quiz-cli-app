import useAuthStore from '../stores/auth.store';
export const formatName = (name: string) => {
  const words = name.split('').map((char: string) => {
    if (char === '_') {
      return ' ';
    }
    return char;
  });

  return words;
};

export const calculateUserRewards = (
  wonCount: number = 0,
  lostCount: number = 0,
) => {
  const { totalQuestions } = useAuthStore.getState();
  const COINS_PER_WIN = 10;
  const COINS_PER_LOSS = 0;
  const baseCoins = wonCount * COINS_PER_WIN + lostCount * COINS_PER_LOSS;
  const totalGames = wonCount + lostCount;
  const winRate = totalGames > 0 ? wonCount / totalQuestions : 0;
  const bonusMultiplier = winRate >= 0.6 ? 1.2 : 1.0;
  const totalCoins = Math.round(baseCoins * bonusMultiplier);

  let awardTitle = 'Novice';
  let awardBadgeColor = '#e28a05';
  let iconName = 'poker-chip'; //MaterialCommunityIcons
  if (wonCount >= 200) {
    awardTitle = 'Diamond';
    iconName = 'diamond-stone'; //MaterialCommunityIcons
    awardBadgeColor = '#3B82F6';
  } else if (wonCount >= 150) {
    awardTitle = 'Gold';
    awardBadgeColor = '#EAB308';
    iconName = 'medal'; //FontAwesome5
  } else if (wonCount >= 100) {
    awardTitle = 'Silver';
    awardBadgeColor = '#94A3B8';
    iconName = 'medal'; //FontAwesome5
  } else if (wonCount >= 50) {
    awardTitle = 'Bronze';
    awardBadgeColor = '#D97706';
    iconName = 'award'; //FontAwesome5
  }

  return {
    coins: totalCoins,
    iconName,
    awardTitle,
    awardBadgeColor,
    winRatePercentage: Math.round(winRate * 100),
  };
};
