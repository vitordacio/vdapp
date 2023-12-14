import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';
import assets from '@assets/index';
import colors from '@styles/colors';
import styles from './styles';

interface IIconProps {
  name: string;
  style?: StyleProp<ImageStyle>;
  tintColor?: string;
  description?: boolean;
  size?: number;
}

export const Icon: React.FC<IIconProps> = ({
  name,
  style,
  tintColor,
  description,
  size,
}) => {
  return (
    <Image
      style={[
        styles.container,
        { width: size || 21, height: size || 21 },
        style,
      ]}
      source={assets[name]}
      resizeMode="contain"
      // tintColor={tintColor || `${colors.TEXT_DEFAULT}`}
      tintColor={
        tintColor ||
        `${!description ? colors.TEXT_DEFAULT : colors.GRAY_DESCRIPTION}`
      }
    />
  );
};
