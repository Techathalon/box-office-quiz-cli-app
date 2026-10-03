import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { View as MotiView } from 'moti';
import { GameMode } from '../types/type';
import { useTheme } from '../hooks/useTheme';
import Feather from 'react-native-vector-icons/Feather';
import Speech from '@mhpdev/react-native-speech';
import { useState } from 'react';
import { styles } from './style';

interface RenderQuestionProps {
  mode: GameMode;
  emojis?: string;
  dialogue?: string;
  clue?: string;
  imageUrl?: string;
  maskedWord?: string;
  scrambledLetters?: string[];
}
const { width, height } = Dimensions.get('window');
export default function RenderQuestion({
  mode,
  emojis,
  dialogue,
  clue,
  imageUrl,
  maskedWord,
  scrambledLetters,
}: RenderQuestionProps) {
  const { theme } = useTheme();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Shared container wrapper theme config
  const containerStyle = {
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.primaryYellow,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  // 2. Toggle Handler for Start / Stop Speech
  const handleTextToSpeech = async () => {
    try {
      if (isSpeaking) {
        // Stop current speech
        await Speech.stop();
        setIsSpeaking(false);
        return;
      }

      if (dialogue) {
        setIsSpeaking(true);
        const result = await Speech.speak(dialogue, {
          language: 'hi-IN',
          rate: 0.9,
          pitch: 1.0,
        });
        Speech.onFinish(({ id: eventId }) => {
          if (eventId === result) setIsSpeaking(false);
        });
      }
    } catch (error) {
      console.error('Speech Error:', error);
      setIsSpeaking(false);
    }
  };

  switch (mode) {
    case 'BLURRED_POSTER':
      return (
        <View
          className="items-center flex-1 p-6 rounded-3xl"
          style={containerStyle}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              resizeMode="contain"
              blurRadius={4}
              style={{
                width: width * 0.5,
                height: height * 0.3,
                borderRadius: width * 0.05,
              }}
              className="rounded-2xl"
            />
          ) : (
            <View
              className="rounded-2xl justify-center items-center"
              style={{
                width: width * 0.5,
                height: height * 0.3,
                backgroundColor: theme.lightskyprimary,
              }}
            >
              <Text style={{ color: theme.textSecondary }}>No Poster</Text>
            </View>
          )}

          <Text
            className="mt-4  font-black"
            style={[styles.titleSize, { color: theme.text }]}
          >
            Guess the Movie
          </Text>

          <Text
            className=" mt-1 uppercase tracking-wide"
            style={[styles.descSize, { color: theme.textSecondary }]}
          >
            Identify the blurred movie poster.
          </Text>
        </View>
      );

    case 'EMOJI_RIDDLES':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          <MotiView
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              type: 'timing',
              duration: 1500,
              loop: true,
            }}
          >
            <Text className="text-4xl mb-4 p-3 text-center">{emojis}</Text>
          </MotiView>

          <Text
            className=" text-center font-black uppercase tracking-widest"
            style={[styles.titleSize, { color: theme.text }]}
          >
            Decode the emojis and guess the movie.
          </Text>
        </View>
      );

    case 'LETTER_PUZZLE':
      return (
        <View
          className="items-center flex-1 p-6 rounded-3xl"
          style={containerStyle}
        >
          {clue && (
            <Text
              className="text-center font-black  mb-2"
              style={[styles.littleLargeTitleSize, { color: theme.text }]}
            >
              {clue}
            </Text>
          )}

          <View className="flex-row flex-wrap justify-center">
            {scrambledLetters?.map((letter, index) => (
              <View
                key={index}
                className="w-[16%] h-[30%] rounded-xl justify-center items-center m-2 border"
                style={{
                  backgroundColor: theme.iconBg,
                  borderColor: theme.primaryYellow,
                }}
              >
                <Text
                  className=" font-black"
                  style={[styles.iconText, { color: theme.iconText }]}
                >
                  {letter}
                </Text>
              </View>
            ))}
          </View>

          <Text
            className=" text-center font-black mb-1 uppercase tracking-widest"
            style={[styles.descSize, { color: theme.textSecondary }]}
          >
            Arrange these letters to find the movie.
          </Text>
        </View>
      );

    case 'DIALOGUE_GURU':
      return (
        <View
          className="p-6 rounded-3xl border-2 relative"
          style={containerStyle}
        >
          {/* Dialogue Text */}
          <Text
            className=" text-center italic font-black mb-4 px-6"
            style={[styles.littleLargeTitleSize, { color: theme.text }]}
          >
            "{dialogue}"
          </Text>

          {/* Text-To-Speech Button */}
          <TouchableOpacity
            onPress={handleTextToSpeech}
            activeOpacity={0.7}
            className="flex-row items-center justify-center self-center px-4 py-2 rounded-full mb-4 border"
            style={{
              backgroundColor: isSpeaking ? theme.primary : theme.iconBg,
              borderColor: theme.border,
            }}
          >
            <Feather
              name={isSpeaking ? 'volume-x' : 'volume-2'}
              style={[
                styles.iconSize,
                { color: isSpeaking ? theme.lightskyprimary : theme.iconText },
              ]}
            />
            <Text
              className="font-bold  italic ml-2"
              style={[
                styles.iconText,
                {
                  color: isSpeaking ? theme.lightskyprimary : theme.iconText,
                },
              ]}
            >
              {isSpeaking ? 'Stop Listening' : 'Listen Dialogue'}
            </Text>
          </TouchableOpacity>

          <Text
            className=" text-center font-black uppercase tracking-widest"
            style={[styles.titleSize, { color: theme.textSecondary }]}
          >
            Which movie is this dialogue from?
          </Text>
        </View>
      );

    case 'SPOT_THE_EXACT':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          <Text
            className=" text-center font-black"
            style={[styles.littleLargeTitleSize, { color: theme.text }]}
          >
            Spot the Correct Movie Title
          </Text>

          <Text
            className=" text-center font-black uppercase tracking-widest"
            style={[styles.titleSize, { color: theme.textSecondary }]}
          >
            Only one spelling is correct.
          </Text>
        </View>
      );

    case 'MISSING_LETTERS':
      return (
        <View className="items-center p-6 rounded-3xl" style={containerStyle}>
          {clue && (
            <Text
              className=" font-black text-center mb-5"
              style={[styles.littleLargeTitleSize, { color: theme.text }]}
            >
              {clue}
            </Text>
          )}

          <Text
            style={[
              styles.littleLargeTitleSize,
              {
                letterSpacing: 8,
                fontWeight: '900',
                color: theme.text,
              },
            ]}
          >
            {maskedWord}
          </Text>

          <Text
            className=" text-center font-black uppercase tracking-widest"
            style={[styles.titleSize, { color: theme.textSecondary }]}
          >
            Fill in the missing letters.
          </Text>
        </View>
      );

    default:
      return null;
  }
}
