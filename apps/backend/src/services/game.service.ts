import prisma from '../config/prisma.js';
import { GameMode } from '../../generated/prisma/enums.js';
export async function getLevelsForMode(userId: number, mode: GameMode) {
  const levels = await prisma.userGameProgress.findUnique({
    where: {
      userId_mode: {
        userId,
        mode,
      },
    },

    select: {
      currentLevel: true,
      levelsWon: true,
      levelsLost: true,
    },
  });
  const questionsCount = await prisma.question.count({
    where: {
      mode,
    },
  });
  if (!levels) {
    await prisma.userGameProgress.create({
      data: {
        userId,
        mode,
        currentLevel: 1,
        levelsWon: [],
        levelsLost: [],
      },
    });
    return {
      levels: { currentLevel: 1, levelsWon: [], levelsLost: [] },
      questionCount: questionsCount,
    };
  }
  return { levels, questionCount: questionsCount };
}
export async function updateLevelData(
  userId: number,
  mode: GameMode,
  level: number,
  won: boolean,
) {
  const userGameProgress = await prisma.userGameProgress.findUnique({
    where: {
      userId_mode: {
        userId,
        mode,
      },
    },
  });
  if (!userGameProgress) {
    await prisma.userGameProgress.create({
      data: {
        userId,
        mode,
        currentLevel: level,
        levelsWon: won ? [level] : [],
        levelsLost: !won ? [level] : [],
      },
    });
  } else {
    let levelsWonValues = [...userGameProgress.levelsWon];
    let levelsLostValues = [...userGameProgress.levelsLost];
    let nextlevel;
    if (won) {
      if (!levelsWonValues.includes(level)) {
        levelsWonValues.push(level);
      }
      levelsLostValues = levelsLostValues.filter((l) => l !== level);
    } else {
      if (!levelsLostValues.includes(level)) {
        levelsLostValues.push(level);
      }
      levelsWonValues = levelsWonValues.filter((l) => l !== level);
    }
    if (userGameProgress.currentLevel > level) {
      nextlevel = userGameProgress.currentLevel;
    } else {
      nextlevel = level + 1;
    }

    await prisma.userGameProgress.update({
      where: {
        userId_mode: {
          userId,
          mode,
        },
      },
      data: {
        currentLevel: nextlevel,
        levelsWon: levelsWonValues,
        levelsLost: levelsLostValues,
      },
    });
  }
  return level + 1;
}
interface User {
  userId: number;
  name: string;
  avatar: string;
  wonCount: number;
  lostCount: number;
}
export async function getAllUsersWithProgress(
  page: number = 1,
  pageSize: number = 20,
  mode?: GameMode,
) {
  const currentPage = Math.max(1, page);
  const limit = Math.max(1, pageSize);
  const offset = (currentPage - 1) * limit;
  let rawLeaderboard: User[];
  if (mode) {
    rawLeaderboard = await prisma.$queryRaw`
    SELECT 
      u.id AS "userId",
      u.name,
      u.avatar,
      COALESCE(SUM(cardinality(gp."levelsWon")), 0)::INT AS "wonCount",
      COALESCE(SUM(cardinality(gp."levelsLost")), 0)::INT AS "lostCount"
    FROM "User" u
    LEFT JOIN "UserGameProgress" gp ON u.id = gp."userId"
    WHERE gp.mode = ${mode}
    GROUP BY u.id, u.name, u.avatar
    ORDER BY "wonCount" DESC, u.id ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
  } else {
    rawLeaderboard = await prisma.$queryRaw`
    SELECT 
      u.id AS "userId",
      u.name,
      u.avatar,
      COALESCE(SUM(cardinality(gp."levelsWon")), 0)::INT AS "wonCount",
      COALESCE(SUM(cardinality(gp."levelsLost")), 0)::INT AS "lostCount"
    FROM "User" u
    LEFT JOIN "UserGameProgress" gp ON u.id = gp."userId"
    GROUP BY u.id, u.name, u.avatar
    ORDER BY "wonCount" DESC, u.id ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
  }
  if (rawLeaderboard.length === 0) {
    return {
      users: [],
      pagination: { currentPage, pageSize: limit, hasMore: false },
    };
  }
  const users = rawLeaderboard.map((user) => ({
    userId: user.userId,
    name: user.name,
    avatar: user.avatar,
    wonCount: user.wonCount,
    lostCount: user.lostCount,
  }));
  const hasMore = rawLeaderboard.length === limit;
  return {
    users,
    pagination: { currentPage, pageSize: limit, hasMore },
  };
}
interface UserProgress {
  wonCount: number;
  lostCount: number;
}
export async function getUserProgress(userId: number) {
  const userProgress: UserProgress[] = await prisma.$queryRaw`
    SELECT 
      COALESCE(SUM(cardinality(gp."levelsWon")), 0)::INT AS "wonCount",
      COALESCE(SUM(cardinality(gp."levelsLost")), 0)::INT AS "lostCount"
    FROM "UserGameProgress" gp
    WHERE gp."userId" = ${userId}
  `;
  if (userProgress.length === 0) {
    return {
      wonCount: 0,
      lostCount: 0,
    };
  }

  return {
    wonCount: userProgress[0]?.wonCount,
    lostCount: userProgress[0]?.lostCount,
  };
}
