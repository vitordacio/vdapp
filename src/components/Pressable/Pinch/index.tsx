import { Pressable } from '@components/GarbTouches/Pressable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PressableProps } from 'react-native';
import styles from './styles';

export function Pinch(props: PressableProps) {
  const scale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch().onUpdate(event => {
    scale.value = event.scale;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={pinchGesture}>
      <Pressable {...props}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </Pressable>
    </GestureDetector>
  );
}
