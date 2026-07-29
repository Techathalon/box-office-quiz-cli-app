import WelcomePage from '../screens/welcome/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import GameplayScreen from '../screens/game/GameplayScreen';
import LevelSelectionScreen from '../screens/game/LevelSelectionScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
      <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
      <Stack.Screen name="GameplayScreen" component={GameplayScreen} />
    </Stack.Navigator>
  );
}
