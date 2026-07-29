import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { getAvatarOptions, handleEditProfile } from '../services/api';

interface EditProfileModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
}
const { width } = Dimensions.get('window');

export default function EditProfileModal({
  isModalVisible,
  setIsModalVisible,
}: EditProfileModalProps) {
  const { theme } = useTheme();
  const { user, setUser } = useAuth();

  // Local input values
  const [editName, setEditName] = useState(user?.name || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

  // State for fetching options
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]); // Added typing
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isModalVisible) {
      setEditName(user?.name || '');
      setEditAvatar(user?.avatar || '');
    }
  }, [isModalVisible, user]);

  useEffect(() => {
    const fetchAvatarOptions = async () => {
      try {
        setIsLoading(true);
        const response = await getAvatarOptions();
        setAvatarOptions(response.avatarOptions || []);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvatarOptions();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await handleEditProfile(
        editName,
        editAvatar,
        user?.deviceToken || '',
      );
      if (response) {
        console.log('Profile updated successfully:', response);
        setUser(response.user);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Failed updating profile:', error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <Pressable
        className="flex-1 bg-black/60 justify-center items-center px-6"
        onPress={() => setIsModalVisible(false)}
      >
        <Pressable
          className="w-full bg-white rounded-[32px] p-6 items-center shadow-2xl"
          style={{ backgroundColor: theme.card || '#FFFFFF' }}
          onPress={e => e.stopPropagation()}
        >
          <View className="w-full flex-row justify-between items-center mb-6">
            <Text className="text-xl font-black " style={{ color: theme.text }}>
              Edit Profile
            </Text>
            <View
              className="rounded-full p-1"
              style={{ backgroundColor: theme.iconBg }}
            >
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Icon
                  name="x"
                  size={width * 0.05}
                  color={theme.iconText || '#FFCC00'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-20 h-20 rounded-full justify-center items-center bg-[#FFF2E0] mb-4 border-2 border-slate-200">
            <Text style={{ fontSize: 44 }}>{editAvatar || '❓'}</Text>
          </View>

          <Text
            className="text-[12px] font-bold  uppercase tracking-wider mb-2 self-start"
            style={{ color: theme.text }}
          >
            Select Avatar
          </Text>
          <View className="w-full h-12 mb-6 justify-center">
            {isLoading ? (
              <ActivityIndicator color={theme.primary || '#F59E0B'} />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row w-full"
              >
                {avatarOptions?.map(emoji => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => setEditAvatar(emoji)}
                    className={`w-11 h-11 items-center justify-center rounded-full mr-2 border-2 ${
                      editAvatar === emoji
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <Text style={{ fontSize: 22 }}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
          <Text
            className="text-[12px] font-bold  uppercase tracking-wider mb-2 self-start"
            style={{ color: theme.text }}
          >
            Display Name
          </Text>
          <TextInput
            value={editName}
            onChangeText={setEditName}
            placeholder="Enter your name"
            placeholderTextColor={theme.placeholder}
            maxLength={20}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-base text-slate-900 mb-6 font-semibold"
            style={{ backgroundColor: theme.white }}
          />
          <View className="flex-row w-full gap-3">
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="flex-1 bg-slate-100 py-3.5 rounded-2xl items-center"
              style={{ backgroundColor: theme.lightskyprimary }}
            >
              <Text className="text-slate-600 font-bold text-[14px]">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSaveChanges}
              style={{ backgroundColor: theme.primary || '#F59E0B' }}
              className="flex-1 py-3.5 rounded-2xl items-center"
            >
              <Text className="text-white font-black text-[14px] tracking-wide">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
