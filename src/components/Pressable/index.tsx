import { Pressable as NativePressable, PressableProps } from 'react-native';

export function Pressable(props: PressableProps) {
  return <NativePressable {...props} />;
}
