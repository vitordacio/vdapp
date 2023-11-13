import React, { useEffect, useState } from 'react';
import { TextProps, TouchableOpacity } from 'react-native';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Control, FieldValues, FieldError, Controller } from 'react-hook-form';
import { ControlledTextInput } from '@components/Input/TextInput';
import styles from './styles';

export interface IRadioOption {
  value?: string;
  title?: string;
  custom?: {
    type: string;
    placeholder?: string;
    width?: number;
    maxLength?: number;
  };
}

export type IRadioProps = TextProps & {
  options: IRadioOption[];
  onChange?: (e: string) => void;
  control?: Control<FieldValues>;
  name?: string;
  error?: FieldError;
  value?: string;
};

const RadioInputs = ({
  options,
  onChange,
  control,
  name,
  error,
  value,
}: IRadioProps) => {
  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useState('');

  useEffect(() => {
    const foundValue = options.find(option => option.value === value);
    const a = foundValue ? value : 'custom';
    setChecked(a);
  }, []);

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <View key={index} style={styles.wrapper}>
          <View style={styles.radio_wrapper}>
            <TouchableOpacity
              onPress={() => {
                setChecked(option.value);
                if (!option.custom) onChange(option.value);
              }}
              style={[
                styles.radio,
                {
                  backgroundColor: `${
                    checked === option.value ? 'blue' : 'white'
                  }`,
                },
              ]}
            />
          </View>
          {option.custom && option.custom.type === 'text' && (
            <ControlledTextInput
              name={name}
              control={control}
              error={error}
              onFocus={() => setChecked('custom')}
              maxLength={option.custom.maxLength}
              placeholder={option.custom.placeholder}
              nullMargin={true}
            />
          )}
          {option.title && <Text style={styles.title}>{option.title}</Text>}
        </View>
      ))}
    </View>
  );
};

type IControlledRadioInputsProps = IRadioProps & {
  control: Control<FieldValues>;
  name: string;
  error?: FieldError;
};

export function ControlledRadioInputs({
  control,
  name,
  error,
  ...rest
}: IControlledRadioInputsProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <RadioInputs
            onChange={onChange}
            name={name}
            control={control}
            error={error}
            {...rest}
          />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}
