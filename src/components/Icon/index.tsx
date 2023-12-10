import React from 'react';
import { ImageBackground, StyleProp, ViewStyle } from 'react-native';
import assets from '@assets/index';
import styles from './styles';

interface IIconProps {
  name: string;
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
}

export const Icon: React.FC<IIconProps> = ({ name, style, tintColor }) => {
  return (
    <ImageBackground
      style={[styles.container, style]}
      source={assets[name]}
      resizeMode="cover"
      tintColor={tintColor || null}
    />
  );
};
