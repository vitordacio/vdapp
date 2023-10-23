import { Pressable } from '@components/GarbTouches/Pressable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PressableProps } from 'react-native';
import styles from './styles';

export function Rotation(props: PressableProps) {
  const rotation = useSharedValue(0);

  const rotationGesture = Gesture.Rotation().onUpdate(event => {
    rotation.value = event.rotation;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${(rotation.value / Math.PI) * 180}deg` }],
  }));

  return (
    <GestureDetector gesture={rotationGesture}>
      <Pressable {...props}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </Pressable>
    </GestureDetector>
  );
}
