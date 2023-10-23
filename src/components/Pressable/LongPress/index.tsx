import { Pressable } from '@components/GarbTouches/Pressable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PressableProps } from 'react-native';
import styles from './styles';

export function LongPress(props: PressableProps) {
  const size = useSharedValue(100);

  const longPressGesture = Gesture.LongPress()
    .onTouchesDown(() => {
      size.value = withTiming(size.value + 200, { duration: 500 });
    })
    .onEnd((e, sucess) => {
      if (sucess) {
        console.log(`Duração: ${e.duration} ms`);
        size.value = withTiming(size.value, { duration: 500 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
  }));

  return (
    <GestureDetector gesture={longPressGesture}>
      <Pressable {...props}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </Pressable>
    </GestureDetector>
  );
}
