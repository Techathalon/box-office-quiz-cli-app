import useSoundStore from '../stores/sound.store';

export default function useSound() {
  const playSound = useSoundStore(state => state.playSound);
  const stopSound = useSoundStore(state => state.stopSound);
  const isMuted = useSoundStore(state => state.isMuted);
  const setIsMuted = useSoundStore(state => state.setIsMuted);
  return { playSound, stopSound, isMuted, setIsMuted };
}
