import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import assets from '@assets/index';
import styles from './styles';

const iconMapping: Record<string, ImageSourcePropType> = {
  inbox: assets.inbox,
  instagram: assets.instagram,
  tiktok: assets.tiktok,
  twitter: assets.twitter,
  twitch: assets.twitch,
  location: assets.location,
};

interface IIconProps {
  name: keyof typeof iconMapping;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IIconProps> = ({ name, style }) => {
  return (
    <ImageBackground
      style={[styles.container, style]}
      source={iconMapping[name]}
      resizeMode="cover"
    />
  );
};
