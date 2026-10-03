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
import AppLayout from './src/components/AppLayout';
import { NavigationContainer } from '@react-navigation/native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { ImageBackground } from 'react-native';
import { handleDeviceOnboarding } from './src/services/api';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useAuth } from './src/hooks/useAuth';
import useAuthStore from './src/stores/auth.store';
import { getQuestionsCount } from './src/services/api';
import { useThemeStore } from './src/stores/theme.store';

function App() {
  const getState = useAlertStore();
  const { user, setUser, setTotalQuestions } = useAuth();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,

        // 👇 FIX THIS PROPERTY NAME FROM 'testDeviceIdentifiers' TO 'testDeviceIds'
        testDeviceIdentifiers: [
          'EMULATOR',
          '9b22ca39-0ae2-46ea-94d0-ee65bab7f18c',
        ],
      })
      .then(() => mobileAds().initialize())
      .then(adapterStatuses => {
        // Look specifically for the Google Mobile Ads status
        const googleStatus = adapterStatuses.find(
          adapter => adapter.name === 'com.google.android.gms.ads.MobileAds',
        );

        if (googleStatus && googleStatus.state === 1) {
          console.log('✅ Google AdMob SDK initialized and ready!');
        } else {
          console.log('⚠️ AdMob SDK initialization pending...');
        }
      })
      .catch(error => {
        console.error('❌ Error initializing AdMob SDK:', error);
      });
  }, []);
  useEffect(() => {
    const checkHydration = async () => {
      if (
        useAuthStore.persist.hasHydrated() &&
        useThemeStore.persist.hasHydrated()
      ) {
        setIsReady(true);
      } else {
        const themeSet = useThemeStore.persist.onFinishHydration(() => {
          setIsReady(true);
          themeSet();
        });
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
          <AppLayout>
            <AppStack />
          </AppLayout>
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
