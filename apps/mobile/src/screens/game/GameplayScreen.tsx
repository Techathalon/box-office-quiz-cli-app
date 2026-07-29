import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View as MotiView } from 'moti';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderOptions from '../../components/RenderOptions';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getQuestion, updateLevelData } from '../../services/api';
import ResultOverlay from '../../components/ResultOverlay';
import RenderQuestion from '../../components/RenderQuestion';
import HintModal from '../../components/HintModal'; // Import new Hint Modal
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
  const [firstHintSeen, setFirstHintSeen] = useState(false);

  // State for Modal Hints
  const [activeHint, setActiveHint] = useState<{
    title: string;
    text: string;
  } | null>(null);

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
    hint1,
    hint2,
  } = gameContent;

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
      stopSound('level_up_sound.mp3');
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
      <>
        <View className="absolute inset-0 " />

        <SafeAreaView className="flex-1 px-5 justify-start">
          {/* Header */}
          <View className="py-4 flex-row justify-between items-center border-b border-white/10">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-full border border-white/10 active:bg-white/10"
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

          {/* Question Display */}
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

          {/* Options List */}
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

          {/* Right-aligned Hint Buttons under options */}
          <View className="flex-row justify-end items-center mb-2 gap-2 space-x-2">
            {/* HINT 1 BUTTON */}
            {hint1 && (
              <MotiView
                animate={{ scale: isEvaluated ? 1 : [1, 1.04, 1] }}
                transition={{
                  type: 'timing',
                  duration: 1800,
                  loop: !isEvaluated,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setActiveHint({ title: 'Hint 1', text: hint1 });
                    setFirstHintSeen(true);
                  }}
                  disabled={isEvaluated}
                  activeOpacity={0.8}
                  className="flex-row items-center px-3.5 py-2 rounded-full border shadow-sm"
                  style={{
                    borderColor: isEvaluated ? '#334155' : theme.iconText,
                    backgroundColor: isEvaluated ? '#1E293B' : theme.iconBg,
                  }}
                >
                  <MotiView
                    animate={{ scale: isEvaluated ? 1 : [1, 1.25, 1] }}
                    transition={{
                      type: 'timing',
                      duration: 1800,
                      loop: !isEvaluated,
                    }}
                  >
                    <MaterialIcons
                      name={isEvaluated ? 'lightbulb-outline' : 'lightbulb'}
                      size={width * 0.042}
                      color={isEvaluated ? '#64748B' : theme.secondaryYellow}
                    />
                  </MotiView>
                  <Text
                    className="text-[14px] font-bold ml-1.5 tracking-wide"
                    style={{
                      color: isEvaluated ? '#64748B' : theme.iconText,
                    }}
                  >
                    Hint 1
                  </Text>
                </TouchableOpacity>
              </MotiView>
            )}

            {/* HINT 2 BUTTON */}
            {hint2 && (
              <MotiView
                animate={{
                  scale: isEvaluated || !firstHintSeen ? 1 : [1, 1.04, 1],
                }}
                transition={{
                  type: 'timing',
                  duration: 1800,
                  loop: !isEvaluated && firstHintSeen,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setActiveHint({ title: 'Hint 2', text: hint2 })
                  }
                  disabled={isEvaluated || !firstHintSeen}
                  activeOpacity={0.8}
                  className="flex-row items-center px-3.5 py-2 rounded-full border shadow-sm"
                  style={{
                    // Soft slate border when locked/disabled, theme color when active
                    borderColor:
                      isEvaluated || !firstHintSeen
                        ? '#334155'
                        : theme.iconText,
                    // Soft solid dark background when locked/disabled, theme background when active
                    backgroundColor:
                      isEvaluated || !firstHintSeen ? '#1E293B' : theme.iconBg,
                  }}
                >
                  <MotiView
                    animate={{
                      scale: isEvaluated || !firstHintSeen ? 1 : [1, 1.25, 1],
                    }}
                    transition={{
                      type: 'timing',
                      duration: 1800,
                      loop: !isEvaluated && firstHintSeen,
                    }}
                  >
                    <MaterialIcons
                      name={
                        !firstHintSeen
                          ? 'lock'
                          : isEvaluated
                          ? 'lightbulb-outline'
                          : 'lightbulb'
                      }
                      size={width * 0.042}
                      color={
                        isEvaluated || !firstHintSeen
                          ? '#64748B' // Soft muted color
                          : theme.secondaryYellow
                      }
                    />
                  </MotiView>
                  <Text
                    className="text-[14px] font-bold ml-1.5 tracking-wide"
                    style={{
                      color:
                        isEvaluated || !firstHintSeen
                          ? '#64748B'
                          : theme.iconText,
                    }}
                  >
                    Hint 2
                  </Text>
                </TouchableOpacity>
              </MotiView>
            )}
          </View>
          {/* Circular Countdown Hint Modal */}
          <HintModal
            isVisible={activeHint !== null}
            hintTitle={activeHint?.title || 'Hint'}
            hintText={activeHint?.text || ''}
            durationSeconds={10}
            onClose={() => setActiveHint(null)}
          />

          <ResultOverlay
            isVisible={showResultModal}
            hasWon={hasWon}
            correctAnswer={correctAnswer}
            currentLevel={level}
            onNext={handleNextAction}
          />
        </SafeAreaView>
      </>
    </>
  );
}
