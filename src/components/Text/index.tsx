import fonts from '@styles/fonts';
import React from 'react';
import { Text as NativeText, TextProps } from 'react-native';

export const Text = (props: TextProps) => {
  return (
    <NativeText
      {...props}
      style={[props.style, { fontFamily: `${fonts.DEFAULT_REGULAR}` }]}
    />
  );
};
