/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useAlertStore } from './src/stores/alert.store';
import CustomAlert from './src/components/CustomAlert';
import AppStack from './src/navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { handleDeviceOnboarding } from './src/services/api';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useAuth } from './src/hooks/useAuth';
import useAuthStore from './src/stores/auth.store';
import { getQuestionsCount } from './src/services/api';

function App() {
  const getState = useAlertStore();
  const { user, setUser, setTotalQuestions } = useAuth();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const checkHydration = async () => {
      if (useAuthStore.persist.hasHydrated()) {
        setIsReady(true);
      } else {
        const unsub = useAuthStore.persist.onFinishHydration(() => {
          setIsReady(true);
          unsub(); //Stop listening.
        });
      }
    };
    checkHydration();
  });
  const handleConfirm = () => {
    if (getState.onConfirm) {
      getState.onConfirm();
    }
    useAlertStore.getState().hideAlert();
  };

  const handleCancel = () => {
    if (getState.onCancel) {
      getState.onCancel();
    }
    useAlertStore.getState().hideAlert();
  };
  useEffect(() => {
    if (user) return;
    const onboardDevice = async () => {
      const deviceToken = await DeviceInfo.getUniqueId();
      const deviceType = Platform.OS;
      const response = await handleDeviceOnboarding(deviceToken, deviceType);
      console.log('user data from response:', response);
      const totalQuestions = await getQuestionsCount();
      setTotalQuestions(totalQuestions.questionsCount);
      setUser(response.user);
    };
    onboardDevice();
  }, [setUser, user, setTotalQuestions]);
  if (!isReady) {
    return null;
  }
  return (
    <ImageBackground
      source={require('./assets/background_bg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>

        <Toast />
        <CustomAlert
          visible={getState.visible}
          title={getState.title}
          message={getState.message}
          confirmText={getState.confirmText}
          cancelText={getState.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          type={getState.type}
        />
      </SafeAreaProvider>
    </ImageBackground>
  );
}

export default App;
