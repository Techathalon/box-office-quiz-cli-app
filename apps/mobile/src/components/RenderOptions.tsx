import React, { useState, useEffect } from 'react';
import { GameMode } from '../types/type';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { View as MotiView } from 'moti';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../hooks/useTheme';
import useSound from '../hooks/useSound';
import { styles } from './style';

interface RenderOptionsProps {
  mode: GameMode;
  options?: string[];
  scrambledLetters?: string[];
  maskedWord?: string;
  correctAnswer: string;
  handleOptionPress: (option: string) => void;
  isEvaluated: boolean;
  selectedAnswer?: string | null;
}

const { width } = Dimensions.get('window');

export default function RenderOptions({
  mode,
  options,
  scrambledLetters,
  maskedWord,
  correctAnswer,
  handleOptionPress,
  isEvaluated,
  selectedAnswer,
}: RenderOptionsProps) {
  const { playSound, stopSound } = useSound();
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [missingIndices, setMissingIndices] = useState<number[]>([]);
  const { theme } = useTheme();
  const displayMask = maskedWord || correctAnswer;

  useEffect(() => {
    setSelectedLetters([]);
    setAvailableLetters(scrambledLetters || []);

    if (mode === 'MISSING_LETTERS') {
      const indices: number[] = [];
      displayMask.split('').forEach((char, idx) => {
        if (char === '_' || char === '*') {
          indices.push(idx);
        }
      });
      setMissingIndices(indices);
    }
  }, [scrambledLetters, mode, correctAnswer, maskedWord, displayMask]);
  useEffect(() => {
    return () => {
      stopSound('correct.mp3');
      stopSound('wrong_answer_sound.mp3');
    };
  });
  const handleMissingLetterPress = (letter: string, index: number) => {
    if (isEvaluated || selectedLetters.length >= missingIndices.length) return;

    const updatedLetters = [...selectedLetters, letter];
    setSelectedLetters(updatedLetters);
    setAvailableLetters(prev => prev.filter((_, i) => i !== index));

    if (updatedLetters.length === missingIndices.length) {
      let missingCounter = 0;
      const finalGuess = displayMask
        .split('')
        .map(char => {
          if (char === '_' || char === '*') {
            const replacement = updatedLetters[missingCounter];
            missingCounter++;
            return replacement;
          }
          return char;
        })
        .join('');

      handleOptionPress(finalGuess);
      if (finalGuess === correctAnswer) {
        playSound('correct.mp3');
      } else {
        playSound('wrong_answer_sound.mp3');
      }
    }
  };

  const handleRemoveMissingLetter = (blankIndex: number) => {
    if (isEvaluated || selectedLetters.length <= blankIndex) return;

    const removedLetter = selectedLetters[blankIndex];
    setSelectedLetters(prev => prev.filter((_, i) => i !== blankIndex));
    setAvailableLetters(prev => [...prev, removedLetter]);
  };

  const renderMissingLettersMode = () => {
    return (
      <View className="mt-4">
        <View className="flex-row justify-center flex-wrap mb-10 gap-x-1.5 gap-y-3">
          {displayMask.split('').map((char: string, index: number) => {
            if (char === ' ') {
              return <View key={index} className="w-6 h-12" />;
            }

            const isBlankSlot = char === '_' || char === '*';

            if (isBlankSlot) {
              const blankOrderIndex = missingIndices.indexOf(index);
              const filledLetter = selectedLetters[blankOrderIndex];

              return (
                <TouchableOpacity
                  key={index}
                  disabled={isEvaluated || !filledLetter}
                  onPress={() => handleRemoveMissingLetter(blankOrderIndex)}
                  className="w-10 h-14 rounded-xl justify-center items-center border"
                  style={{
                    borderWidth: 2,
                    borderColor: isEvaluated
                      ? selectedAnswer === correctAnswer
                        ? '#10B981'
                        : '#EF4444'
                      : filledLetter
                      ? theme.primaryYellow
                      : 'rgba(255, 255, 255, 0.15)',
                    backgroundColor: theme.lightskyprimary,
                  }}
                >
                  <Text
                    className=" font-black"
                    style={[
                      styles.littleLargeTitleSize,
                      {
                        color: isEvaluated
                          ? selectedAnswer === correctAnswer
                            ? '#10B981'
                            : '#EF4444'
                          : theme.iconText,
                      },
                    ]}
                  >
                    {filledLetter || ''}
                  </Text>
                  {!filledLetter && (
                    <View className="absolute bottom-2 w-4 h-0.5 border-yellow-500 bg-yellow-500 rounded-full" />
                  )}
                </TouchableOpacity>
              );
            }

            return (
              <View
                key={index}
                className="w-10 h-14 justify-center items-center rounded-xl border"
                style={{
                  backgroundColor: theme.iconBg,
                  borderColor: theme.iconText,
                }}
              >
                <Text
                  className="font-black"
                  style={[
                    styles.littleLargeTitleSize,
                    { color: theme.iconText },
                  ]}
                >
                  {char}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          className="mt-4 p-4 rounded-3xl border"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.primaryYellow,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Styled Header Instruction Chip */}
          <View className="items-center mb-4">
            <View
              className="px-3 py-1 rounded-full border"
              style={{
                backgroundColor: theme.iconBg,
                borderColor: theme.iconText,
              }}
            >
              <Text
                className=" font-bold tracking-wider text-center uppercase"
                style={[styles.titleSize, { color: theme.iconText }]}
              >
                SELECT A LETTER
              </Text>
            </View>
            <Text
              className="text-[14px] font-semibold mt-1.5 text-center uppercase"
              style={[styles.titleSize, { color: theme.text }]}
            >
              Tap a filled blank above to remove it
            </Text>
          </View>
          <View className="flex-row flex-wrap justify-center gap-2.5">
            {availableLetters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                disabled={isEvaluated}
                activeOpacity={0.7}
                onPress={() => handleMissingLetterPress(letter, index)}
                className="w-15 h-15 rounded-2xl p-2 justify-center items-center"
                style={{
                  backgroundColor: theme.card,
                  borderWidth: 2,
                  borderBottomWidth: 4, // Gives keys a tactile 3D keyboard button feel
                  borderColor: theme.primaryYellow,
                  shadowColor: theme.shadow,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <Text
                  className="font-black"
                  style={[styles.littleLargeTitleSize, { color: theme.text }]}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };
  const handlePuzzleLetterPress = (letter: string, index: number) => {
    if (isEvaluated || selectedLetters.length >= correctAnswer.length) return;

    const updatedLetters = [...selectedLetters, letter];
    setSelectedLetters(updatedLetters);
    setAvailableLetters(prev => prev.filter((_, i) => i !== index));

    if (updatedLetters.length === correctAnswer.length) {
      handleOptionPress(updatedLetters.join(''));
      if (updatedLetters.join('') !== correctAnswer) {
        playSound('wrong_answer_sound.mp3');
      } else {
        playSound('correct.mp3');
      }
    }
  };

  const handleRemovePuzzleLetter = (index: number) => {
    if (isEvaluated || selectedLetters.length === 0) return;
    const removedLetter = selectedLetters[index];

    setSelectedLetters(prev => prev.filter((_, i) => i !== index));
    setAvailableLetters(prev => [...prev, removedLetter]);
  };

  const renderLetterPuzzleMode = () => {
    return (
      <View className="mt-4">
        <View className="flex-row justify-center flex-wrap mb-8 gap-2">
          {correctAnswer.split('').map((_: string, index: number) => {
            const currentLetter = selectedLetters[index];

            return (
              <TouchableOpacity
                key={index}
                disabled={isEvaluated || !currentLetter}
                onPress={() => handleRemovePuzzleLetter(index)}
                className="w-[16%] h-[35%] rounded-xl justify-center items-center border"
                style={{
                  borderWidth: 2,
                  borderColor: isEvaluated
                    ? selectedLetters.join('') === correctAnswer
                      ? '#10B981'
                      : '#EF4444'
                    : currentLetter
                    ? theme.iconText
                    : 'rgba(63, 63, 70, 0.5)',
                  backgroundColor: theme.iconBg,
                }}
              >
                <Text
                  className=" font-black"
                  style={[
                    styles.littleLargeTitleSize,
                    {
                      color: isEvaluated
                        ? selectedLetters.join('') === correctAnswer
                          ? '#10B981'
                          : '#EF4444'
                        : theme.iconText,
                    },
                  ]}
                >
                  {currentLetter || ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          className="mt-4 p-4 rounded-3xl border"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.primaryYellow,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Styled Header Instruction Chip */}
          <View className="items-center mb-3">
            <View
              className="px-3 py-1 rounded-full border"
              style={{
                backgroundColor: theme.iconBg,
                borderColor: theme.iconText,
              }}
            >
              <Text
                className=" font-bold tracking-wider text-center uppercase"
                style={[styles.titleSize, { color: theme.iconText }]}
              >
                SELECT A LETTER
              </Text>
            </View>
            <Text
              className=" font-semibold mt-1.5 text-center uppercase"
              style={[styles.titleSize, { color: theme.text }]}
            >
              Tap a filled blank above to remove it
            </Text>
          </View>
          <View className="flex-row flex-wrap justify-center gap-2">
            {availableLetters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                disabled={isEvaluated}
                onPress={() => handlePuzzleLetterPress(letter, index)}
                className="w-12 h-12  rounded-xl justify-center items-center border"
                style={{
                  backgroundColor: theme.lightskyprimary,
                  borderColor: theme.primaryYellow,
                }}
              >
                <Text
                  className=" font-black"
                  style={[
                    styles.littleLargeTitleSize,
                    { color: theme.iconText },
                  ]}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };
  const renderMCQOptions = () => {
    return (
      <>
        {options?.map((option: string, idx: number) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer;

          // Base unselected state values using theme tokens
          let borderColor = theme.primaryYellow;
          let backgroundColor = theme.surface;
          let textColor = theme.text;
          let textDecorationLine: 'none' | 'line-through' = 'none';

          if (isEvaluated) {
            if (isCorrect) {
              borderColor = '#10B981'; // Standard green success boundary
              backgroundColor = '#E6F4EA'; // Soft green success base
              textColor = '#137333';
            } else if (isSelected && !isCorrect) {
              borderColor = theme.error; // Standard theme error boundary (#EF4444)
              backgroundColor = '#FCE8E6'; // Soft red failure base
              textColor = '#C5221F';
            } else {
              // Muted theme state for other incorrect choices
              borderColor = theme.border;
              backgroundColor = theme.lightskyprimary;
              textColor = theme.placeholder;
              textDecorationLine = 'line-through';
            }
          }

          return (
            <MotiView
              key={idx}
              from={{ opacity: 0, translateY: 15 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', delay: idx * 60 }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={isEvaluated}
                onPress={() => {
                  handleOptionPress(option);
                  if (option === correctAnswer) {
                    playSound('correct.mp3');
                  } else {
                    playSound('wrong_answer_sound.mp3');
                  }
                }}
                className="w-full  px-6 rounded-2xl mb-3 flex-row justify-between items-center"
                style={{
                  paddingVertical: width * 0.03,
                  borderWidth: 2,
                  borderColor: borderColor,
                  backgroundColor: backgroundColor,
                  shadowColor: theme.shadow,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text
                  className=" font-black tracking-wide"
                  style={[
                    styles.titleSize,
                    {
                      color: textColor,
                      textDecorationLine: textDecorationLine,
                    },
                  ]}
                >
                  {option}
                </Text>

                {isEvaluated && isCorrect && (
                  <MaterialIcons
                    name="check-circle"
                    size={width * 0.055}
                    color="#10B981"
                  />
                )}

                {isEvaluated && isSelected && !isCorrect && (
                  <MaterialIcons
                    name="cancel"
                    size={width * 0.055}
                    color={theme.error}
                  />
                )}
              </TouchableOpacity>
            </MotiView>
          );
        })}
      </>
    );
  };
  return (
    <View className="flex-1 pb-1 mt-3">
      {mode === 'MISSING_LETTERS' && renderMissingLettersMode()}
      {mode === 'LETTER_PUZZLE' && renderLetterPuzzleMode()}
      {mode !== 'MISSING_LETTERS' &&
        mode !== 'LETTER_PUZZLE' &&
        renderMCQOptions()}
    </View>
  );
}
