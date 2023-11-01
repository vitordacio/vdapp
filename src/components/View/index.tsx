import React from 'react';
import { View as NativeView, ViewProps } from 'react-native';
import styles from './styles';

export const View = (props: ViewProps) => {
  return <NativeView {...props} />;
};

export const AppView = (props: ViewProps) => {
  return <NativeView {...props} style={[styles.app_view, props.style]} />;
};
