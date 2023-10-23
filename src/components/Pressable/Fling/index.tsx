import { Pressable } from '@components/GarbTouches/Pressable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Dimensions, PressableProps } from 'react-native';
import styles from './styles';

export function Fling(props: PressableProps) {
  const start = 24;
  const limit = Dimensions.get('window').width - 124;
  const position = useSharedValue(start);

  const directionRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      position.value = withTiming(limit, { duration: 500 });
    });

  const directionLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      position.value = withTiming(start, { duration: 500 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(directionRight, directionLeft)}>
      <Pressable {...props}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </Pressable>
    </GestureDetector>
  );
}
