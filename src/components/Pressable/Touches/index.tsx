import { Pressable } from '@components/GarbTouches/Pressable';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PressableProps } from 'react-native';
import styles from './styles';

export function Touches(props: PressableProps) {
  const position = useSharedValue(100);
  const doubleTapActive = useSharedValue(0);

  const onPressIn = () => {
    position.value = withTiming(150);
    // position.value = withSpring(150);
  };
  const onPressOut = () => {
    position.value = withTiming(100);
  };

  const onGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      doubleTapActive.value = withTiming(
        Number(doubleTapActive) === 0 ? 1 : 0,
        { duration: 500 },
      );
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: position.value,
    height: position.value,
    backgroundColor: interpolateColor(
      doubleTapActive.value,
      [0, 1],
      ['red', 'blue'],
    ),
  }));

  return (
    <GestureDetector gesture={onGesture}>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...props}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </Pressable>
    </GestureDetector>
  );
}
