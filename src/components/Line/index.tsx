import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View } from '@components/View';
import styles from './styles';

interface ILineProps {
  style?: StyleProp<ViewStyle>;
}

export const LineY: React.FC<ILineProps> = ({ style }) => {
  return <View style={[styles.lineY, style]} />;
};

export const LineX: React.FC<ILineProps> = ({ style }) => {
  return <View style={[styles.lineX, style]} />;
};
