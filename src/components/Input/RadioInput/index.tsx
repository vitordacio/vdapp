import React from 'react';
import { TextProps, TouchableOpacity } from 'react-native';
import { Text } from '@components/Text';
import { View } from '@components/View';
import styles from './styles';

export type IRadioProps = TextProps & {
  handleSubmit: (e: string) => void;
  currentValue: unknown;
  value: string;
  title?: string;
};

export const RadioInput = ({
  value,
  title,
  handleSubmit,
  currentValue,
}: IRadioProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.radio_wrapper}>
        <TouchableOpacity
          onPress={() => handleSubmit(value)}
          style={[
            styles.radio,
            {
              backgroundColor: `${currentValue === value ? 'blue' : 'white'}`,
            },
          ]}
        />
      </View>

      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};
