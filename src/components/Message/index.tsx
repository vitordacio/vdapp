import { Text } from '@components/Text';
import { View } from '@components/View';
import Animated from 'react-native-reanimated';
import { useEffect } from 'react';
import useMessage from '@contexts/message';
import { Icon } from '@components/Icon';
import styles from './styles';

export const Message = () => {
  const { handleMessage, handleExiting, animatedStyle, refresh } = useMessage();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleExiting();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [refresh]);

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        handleMessage.type === 'error' && { backgroundColor: '#E63C3D' },
      ]}
    >
      <View style={styles.icon}>
        <Icon name={handleMessage.icon || 'check'} tintColor="#fff" />
      </View>
      <Text style={styles.title}>{handleMessage.message}</Text>
    </Animated.View>
  );
};
