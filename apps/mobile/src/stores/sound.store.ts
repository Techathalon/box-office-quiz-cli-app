import { create } from 'zustand';
//import TrackPlayer, { Track } from 'react-native-track-player';

// Static map so Metro bundler statically resolves local sound assets
// const AUDIO_ASSETS: Record<string, Track> = {
//   'confetti_sound.mp3': {
//     id: 'confetti_sound.mp3',
//     url: require('../../assets/audio/confetti_sound.mp3'),
//     title: 'Confetti Sound',
//     artist: 'App Effects',
//   },
//   'level_up_sound.mp3': {
//     id: 'level_up_sound.mp3',
//     url: require('../../assets/audio/level_up_sound.mp3'),
//     title: 'Level Up',
//     artist: 'App Effects',
//   },
// };

interface SoundState {
  isPlayerReady: boolean;
  setupPlayer: () => Promise<void>;
  playSound: (fileName: string) => Promise<void>;
  stopSound: () => Promise<void>;
}

export const useSoundStore = create<SoundState>((set, get) => ({
  isPlayerReady: false,

  // Call this once during app startup
  setupPlayer: async () => {
    if (get().isPlayerReady) return;
    try {
      //await TrackPlayer.setupPlayer();
      set({ isPlayerReady: true });
    } catch (error) {
      console.error('Failed to initialize TrackPlayer:', error);
    }
  },

  playSound: async (fileName: string) => {
    // const trackConfig = AUDIO_ASSETS[fileName];
    // if (!trackConfig) {
    //   console.warn(`Sound asset "${fileName}" not found in AUDIO_ASSETS map.`);
    //   return;
    // }

    try {
      // Ensure player setup is complete
      if (!get().isPlayerReady) {
        await get().setupPlayer();
      }

      // Clear existing tracks, load requested sound, and play immediately
      // await TrackPlayer.reset();
      // await TrackPlayer.add([trackConfig]);
      // await TrackPlayer.play();
    } catch (error) {
      console.error(`Error playing sound ${fileName}:`, error);
    }
  },

  stopSound: async () => {
    try {
      // await TrackPlayer.stop();
      // await TrackPlayer.reset();
    } catch (error) {
      console.error('Error stopping track playback:', error);
    }
  },
}));

export default useSoundStore;
