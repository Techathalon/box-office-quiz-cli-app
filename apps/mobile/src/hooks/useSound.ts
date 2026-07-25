import useSoundStore from '../stores/sound.store';

export default function useSound() {
  const playSound = useSoundStore(state => state.playSound);
  const stopSound = useSoundStore(state => state.stopSound);
  return { playSound, stopSound };
}
