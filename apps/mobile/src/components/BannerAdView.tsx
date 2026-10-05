import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import { styles } from './style';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

export default function DismissibleBannerAdView() {
  const bannerRef = useRef<BannerAd>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  if (!isVisible) return null;

  return (
    <View className="items-center justify-center bg-slate-50  border-slate-200 w-full">
      {/* Header bar with close button */}
      {isLoaded && (
        <View className="flex-row justify-between items-center w-full px-3  bg-slate-200">
          <Text
            className=" text-slate-500 font-semibold uppercase"
            style={styles.textSize}
          >
            Ad
          </Text>
          <TouchableOpacity
            className="p-1"
            onPress={() => setIsVisible(false)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text
              className=" text-slate-600 font-medium"
              style={styles.textSize}
            >
              ✕ Close
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        onAdLoaded={() => setIsLoaded(true)}
        onAdFailedToLoad={error => {
          console.warn('⚠️ Ad failed to load:', error.message);
          setIsVisible(false);
        }}
      />
    </View>
  );
}
