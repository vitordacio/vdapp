import React, { useState } from 'react';
import { TextProps, TouchableOpacity } from 'react-native';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Control, FieldValues, FieldError, Controller } from 'react-hook-form';
import styles from './styles';

export type IRadioProps = TextProps & {
  value: string;
  title?: string;
  onChange?: (e: string) => void;
};

const RadioInput = ({ value, title, onChange, ...rest }: IRadioProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setChecked(!checked);
          onChange(value);
        }}
        style={[
          styles.radio,
          { backgroundColor: `${checked ? 'blue' : 'white'}` },
        ]}
      />
      {title && (
        <Text style={styles.title} {...rest}>
          {title}
        </Text>
      )}
    </View>
  );
};

type IControlledRadioInputProps = IRadioProps & {
  control: Control<FieldValues>;
  name: string;
  error?: FieldError;
};

export function ControlledRadioInput({
  control,
  name,
  error,
  ...rest
}: IControlledRadioInputProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioInput onChange={onChange} value={value} {...rest} />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}
