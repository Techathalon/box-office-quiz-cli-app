import { create } from 'zustand';
import { AudioContext, decodeAudioData } from 'react-native-audio-api';

const AUDIO_ASSETS: Record<string, any> = {
  'confetti_sound.mp3': require('../../assets/audio/confetti_sound.mp3'),
  'level_up_sound.mp3': require('../../assets/audio/level_up_sound.mp3'),
  'wrong_next_level_sound.mp3': require('../../assets/audio/wrong_next_level_sound.mp3'),
  'coin_sound.mp3': require('../../assets/audio/coin_sound.mp3'),
  'correct_sound.mp3': require('../../assets/audio/correct_sound.mp3'),
  'correct.mp3': require('../../assets/audio/correct.mp3'),
  'wrong_answer_sound.mp3': require('../../assets/audio/wrong_answer_sound.mp3'),
};

interface SoundState {
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  activeContexts: Record<string, AudioContext>;
  playSound: (fileName: string) => Promise<void>;
  stopSound: (fileName: string) => Promise<void>;
}

export const useSoundStore = create<SoundState>((set, get) => ({
  isMuted: false,
  setIsMuted: isMuted => set(() => ({ isMuted })),
  activeContexts: {},

  playSound: async (fileName: string) => {
    const asset = AUDIO_ASSETS[fileName];
    if (!asset) return;
    if (get().isMuted) return;

    // Halt previous instance allocations cleanly
    await get().stopSound(fileName);

    try {
      // 1. Initialise a raw native Web Audio graph context thread
      const ctx = new AudioContext({
        sampleRate: 48000,
      });

      // 2. FIXED: Decode the required local asset ID directly using the library utility
      // This bypasses the buggy fetch() network layer entirely
      const audioBuffer = await decodeAudioData(asset);

      // 3. Mount an internal buffer trigger source node element
      const source = ctx.createBufferSource(); //
      source.buffer = audioBuffer; //
      source.connect(ctx.destination); //

      set(state => ({
        activeContexts: { ...state.activeContexts, [fileName]: ctx },
      }));

      // 4. Play the sound instantly
      source.start(0); //

      // Clean context allocations automatically when sound ends
      source.onEnded = () => {
        ctx.close(); // Frees up C++/Java audio layer memory leaks
        set(state => {
          const next = { ...state.activeContexts };
          delete next[fileName];
          return { activeContexts: next };
        });
      };
    } catch (error) {
      console.error(`Audio playback crashed for asset "${fileName}":`, error);
    }
  },

  stopSound: async (fileName: string) => {
    const ctx = get().activeContexts[fileName];
    if (ctx) {
      try {
        // Shuts down the local native audio thread timeline instantly
        await ctx.close();
      } catch (e) {
        console.error(e);
      }
      set(state => {
        const next = { ...state.activeContexts };
        delete next[fileName];
        return { activeContexts: next };
      });
    }
  },
}));

export default useSoundStore;
