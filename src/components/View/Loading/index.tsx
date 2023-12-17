import React from 'react';
import LottieView from 'lottie-react-native';
import { ViewProps } from 'react-native';
import { View } from '@components/View';
import assets from '@assets/index';
import styles from './styles';

export const LoadingView = (props: ViewProps) => {
  return (
    <View
      {...props}
      style={[styles.container, styles.background_gray, props.style]}
    >
      <LottieView
        style={styles.loading}
        source={assets.loading_view}
        autoPlay
        loop
      />
    </View>
  );
};

export const Loading: React.FC<{ size?: number } & ViewProps> = props => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      <LottieView
        style={{ width: props.size || 24, height: props.size || 24 }}
        source={assets.loading}
        autoPlay
        loop
      />
    </View>
  );
};
