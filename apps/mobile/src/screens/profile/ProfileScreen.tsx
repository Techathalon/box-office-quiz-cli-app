import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import CardPage from '../../components/CardPage';
import { formatName } from '../../utils/game.util';
import { Card } from '../../types/type';
import EditProfileModal from '../../components/EditProfileModal';
import useSound from '../../hooks/useSound';
import { SvgXml } from 'react-native-svg';
import multiavatar from '@multiavatar/multiavatar/esm';
import { ThemeMode } from '../../stores/theme.store';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
export default function ProfileScreen() {
  const { theme, mode, setMode } = useTheme();
  const { user } = useAuth();
  const { isMuted, setIsMuted } = useSound();
  const svgCode = multiavatar(user?.avatar || 'Binx Bond');

  // Modal visibility states
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openProfileModal = () => {
    setIsModalVisible(true);
  };

  const settingCards: Card[] = [
    {
      id: 1,
      title: 'Profile',
      desc: 'Edit your profile',
      icon: 'user',
      characterImg: require('../../../assets/profile_card_image.png'),
      mode: 'column',
      handlePress: openProfileModal,
    },
    {
      id: 2,
      title: 'Sound Effects',
      desc: isMuted
        ? 'Sound effects are turned off'
        : 'Play audio during gameplay',
      icon: isMuted ? 'volume-x' : 'volume-2',
      hasToggle: true,
      mode: 'column',
      toggleValue: isMuted,
      onToggleChange: setIsMuted,
    },

    {
      id: 3,
      title: 'About',
      desc: 'Learn more about us',
      icon: 'info',
      mode: 'column',
    },
  ];
  const themeOptions: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'light', label: 'Light', icon: 'sun' },
    { mode: 'dark', label: 'Dark', icon: 'moon' },
    { mode: 'system', label: 'System', icon: 'monitor' },
  ];
  const handleThemeChange = async (mode: ThemeMode) => {
    setMode(mode);
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="absolute inset-0 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* HEADER HERO AREA */}
        <View className="relative h-48 justify-end items-center pb-6">
          <View className="absolute top-0 left-0 right-0 h-40 rounded-b-[40px] bg-zinc-900/55" />

          {/* Avatar Ring Container */}
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'timing', duration: 800 }}
            className="z-10 rounded-full p-1.5 border-4"
            style={{
              borderColor: theme.primaryYellow,
              backgroundColor: theme.surface,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 15,
              elevation: 8,
            }}
          >
            <View className="w-24 h-24 rounded-full justify-center items-center bg-[#FFF2E0]">
              <Text style={{ fontSize: 56 }} className="animate-bounce">
                <SvgXml xml={svgCode} />
              </Text>
            </View>
          </MotiView>
        </View>

        {/* USER NAME & ID */}
        <View className="items-center px-6 mb-6">
          <Text
            className="text-2xl font-black tracking-wide text-center"
            style={{ color: theme.secondary }}
          >
            {formatName(user?.name || 'Guest')}
          </Text>
          <Text
            className="text-md font-bold italic tracking-wider mt-1 opacity-80"
            style={{ color: theme.success }}
          >
            ★ Lights Camera Action ★
          </Text>
        </View>
        <View className="flex items-center mx-6 mb-3">
          <View
            className="w-full felx-col p-2 rounded-2xl border"
            style={{
              borderColor: theme.border || '#E5E7EB',
              backgroundColor: theme.card || '#FFFFFF',
            }}
          >
            <View className=" flex-row items-center ml-4 my-2">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center mr-2"
                style={{ backgroundColor: theme.iconBg }}
              >
                <Feather
                  name={mode === 'light' ? 'sun' : 'moon'}
                  size={width * 0.05}
                  color={theme.iconText || '#FFFFFF'}
                />
              </View>
              <Text
                className="text-[13px] font-black tracking-wide uppercase"
                style={{ color: theme.text }}
              >
                Customize App Appearance
              </Text>
            </View>
            <View className="w-full flex-row justify-between items-center p-2 ">
              {themeOptions.map(option => {
                const isActive = mode === option.mode;

                return (
                  <TouchableOpacity
                    key={option.mode}
                    activeOpacity={0.7}
                    onPress={() => handleThemeChange(option.mode)}
                    className="flex-1 flex-row items-center justify-center py-3 px-2 mx-1 rounded-xl"
                    style={{
                      backgroundColor: isActive
                        ? `${theme.primary}`
                        : `${theme.primary}33`,
                    }}
                  >
                    <Feather
                      name={option.icon}
                      size={18}
                      color={
                        isActive
                          ? theme.white || '#0EA5E9'
                          : theme.primary || '#6B7280'
                      }
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      className="text-sm font-bold tracking-wide"
                      style={{
                        color: isActive
                          ? theme.white || '#0EA5E9'
                          : theme.primary || '#6B7280',
                      }}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View className="flex items-center mx-3">
          {settingCards.map(card => (
            <CardPage key={card.id} mode={card} />
          ))}
        </View>
        {isModalVisible && (
          <EditProfileModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        )}
      </ScrollView>
    </View>
  );
}
