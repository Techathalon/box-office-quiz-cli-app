import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '../components/CustomTabBar';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" children={() => <HomeScreen />} />
      <Tab.Screen name="Leaderboard" children={() => <LeaderboardScreen />} />
      {/* <Tab.Screen
        name="Notifications"
        children={() => <DummyScreen name="Notifications" />}
      /> */}
      <Tab.Screen name="Profile" children={() => <ProfileScreen />} />
    </Tab.Navigator>
  );
}
