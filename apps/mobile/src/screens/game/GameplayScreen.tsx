import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View as MotiView } from 'moti';
import Feather from 'react-native-vector-icons/Feather';
import RenderOptions from '../../components/RenderOptions';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getQuestion, updateLevelData } from '../../services/api';
import ResultOverlay from '../../components/ResultOverlay';
import RenderQuestion from '../../components/RenderQuestion';
import { useCallback } from 'react';
import useSound from '../../hooks/useSound';

const { width } = Dimensions.get('window');

export default function GameplayScreen({ route, navigation }: any) {
  const { mode, level } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();
  const { playSound, stopSound } = useSound();

  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    async function loadQuestion() {
      try {
        const res = await getQuestion(mode, level);
        if (res.success && res.question.length > 0) {
          setQuestionData(res.question[0]);
        } else {
          navigation.goBack();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadQuestion();
  }, [mode, level, navigation]);
  const gameContent = questionData?.content || {};
  const {
    correctAnswer,
    options = [],
    emojis,
    dialogue,
    clue,
    imageUrl,
    maskedWord,
    scrambledLetters,
  } = gameContent;
  console.log('gameContent: ', gameContent);

  const handleOptionPress = useCallback(
    async (chosenOption: string) => {
      if (isEvaluated) return;

      setSelectedAnswer(chosenOption);
      setIsEvaluated(true);
      const winState = chosenOption === correctAnswer;
      setHasWon(winState);

      try {
        await updateLevelData(user?.id as number, mode, level, winState);
        setTimeout(() => {
          setShowResultModal(true);
        }, 600);
      } catch (err) {
        console.error('Failed saving score update mutations', err);
      }
    },
    [correctAnswer, isEvaluated, level, mode, user],
  );

  const handleNextAction = () => {
    playSound('level_up_sound.mp3');
    setShowResultModal(false);
    navigation.replace('GameplayScreen', { mode, level: level + 1 });
  };
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, [stopSound]);

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

  return (
    <>
      <ImageBackground
        source={require('../../../assets/background_bg.png')}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/30" />

        <SafeAreaView className="flex-1 px-5 justify-start">
          <View className="py-4 flex-row justify-between items-center border-b border-white/10">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-full  border border-white/10 active:bg-white/10"
              style={{ backgroundColor: theme.iconBg }}
            >
              <Feather name="x" size={width * 0.05} color={theme.iconText} />
            </TouchableOpacity>
            <Text
              className="text-xl font-black tracking-widest uppercase"
              style={{ color: theme.text }}
            >
              Level {level}
            </Text>
            <View style={{ width: width * 0.09 }} className="opacity-0" />
          </View>
          <MotiView
            from={{ opacity: 0, translateY: -15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', duration: 400 }}
            className="w-full mt-4 mb-5 pt-2"
          >
            <RenderQuestion
              mode={mode}
              emojis={emojis}
              dialogue={dialogue}
              clue={clue}
              imageUrl={imageUrl}
              maskedWord={maskedWord}
              scrambledLetters={scrambledLetters}
            />
          </MotiView>
          <View>
            <RenderOptions
              mode={mode}
              options={options}
              scrambledLetters={scrambledLetters}
              maskedWord={maskedWord}
              correctAnswer={correctAnswer}
              handleOptionPress={handleOptionPress}
              isEvaluated={isEvaluated}
              selectedAnswer={selectedAnswer}
            />
          </View>
          <ResultOverlay
            isVisible={showResultModal}
            hasWon={hasWon}
            correctAnswer={correctAnswer}
            currentLevel={level}
            onNext={handleNextAction}
          />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
