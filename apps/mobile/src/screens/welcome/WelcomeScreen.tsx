import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStackParamList } from '../../navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../hooks/useTheme';

const { height, width } = Dimensions.get('window');

const WelcomePage: React.FC = () => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <ImageBackground
      source={require('../../../assets/welcome_bg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      {/* Dark cinematic gradient/overlay */}
      <View className="absolute inset-0 bg-black/30" />

      <SafeAreaView className="flex-1 justify-between px-8 py-6">
        {/* Top Section: App Badge & Sub-header */}
        <View className="items-center mt-6">
          <View
            className=" border border-amber-500/30 px-4 py-1.5 rounded-full flex-row items-center"
            style={{
              backgroundColor: theme.iconBg,
              borderColor: theme.secondaryYellow,
              opacity: 0.75,
            }}
          >
            <Ionicons
              name="film"
              size={width * 0.1}
              color={theme.iconText || '#FFCC00'}
            />
            <Text
              className="font-bold text-[10px] tracking-widest ml-2 uppercase"
              style={{ color: theme.iconText || '#FFCC00' }}
            >
              Now Showing
            </Text>
          </View>
        </View>

        {/* Middle Section: Unique "Cinema Ticket" Graphic Card */}
        <View className="top-0 mt-3 my-auto">
          <View
            style={{ minHeight: height * 0.15 }}
            className="w-full bg-zinc-900/55 border border-white/10 rounded-[32px] p-6 justify-between items-center shadow-2xl relative overflow-hidden"
          >
            {/* Ticket Notch Cutouts (Left & Right) using relative positioning */}
            <View className="absolute -left-4 top-1/2 -mt-4 w-8 h-8 rounded-full bg-zinc-900/50 border-r border-white/10" />
            <View className="absolute -right-4 top-1/2 -mt-4 w-8 h-8 rounded-full bg-zinc-900/50 border-l border-white/10" />

            {/* Ticket Header */}
            <View className="items-center mt-2">
              <Text className="text-gray-400 text-xs font-bold tracking-[0.3em] uppercase mb-1">
                ★ Lights Camera Action ★
              </Text>
              <Text className="text-3xl font-black tracking-tighter text-center uppercase">
                <Text style={{ color: theme.primaryYellow || '#FFCC00' }}>
                  Box Office
                </Text>
                {'\n'}
                <Text className="text-white">QuizUp</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Section: Primary Action Button */}
        <View className="items-center mb-20">
          <TouchableOpacity
            onPress={() => navigation.navigate('AppTabs', { screen: 'Home' })}
            className="w-full py-4 border border-amber-500/30 rounded-2xl flex-row items-center justify-center shadow-2xl"
            style={{
              backgroundColor: theme.primaryYellow || '#FFCC00',
              shadowColor: theme.primaryYellow || '#FFCC00',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.35,
              shadowRadius: 15,
              elevation: 8,
              opacity: 0.85,
            }}
            activeOpacity={0.85}
          >
            <Text className="text-zinc-950 text-lg font-black tracking-widest uppercase mr-2">
              Start Game
            </Text>
            <Ionicons name="play" size={width * 0.04} color="#09090b" />
          </TouchableOpacity>

          <Text
            className="mt-4 tracking-wider uppercase text-md font-semibold"
            style={{ color: theme.text || '#C68A4C' }}
          >
            Are you ready to test your movie brain?
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomePage;
