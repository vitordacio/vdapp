import { Pressable } from '@components/GarbTouches/Pressable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PressableProps } from 'react-native';
import styles from './styles';

export function Pan(props: PressableProps) {
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .minPointers(1)
    .onUpdate(event => {
      position.value = event.translationX;

      if (event.translationX > 0) {
        // going right
      } else {
        // going left
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Pressable {...props}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </Pressable>
    </GestureDetector>
  );
}
