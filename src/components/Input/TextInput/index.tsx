import Feather from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import {
  TextInputProps,
  TextInput as NativeTextInput,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Control, FieldValues, FieldError, Controller } from 'react-hook-form';
import colors from '@styles/colors';
import styles from './styles';

export type ITextInputProps = TextInputProps & {
  icon?: React.ComponentProps<typeof Feather>['name'];
  value?: string;
  title?: string;
  status?: {
    valid: boolean;
  };
};

const TextInput = ({
  icon,
  value,
  title,
  status,
  ...rest
}: ITextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isSecurity, setIsSecurity] = useState(rest.secureTextEntry);
  const [isValid, setIsValid] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    if (status) setIsValid(status.valid);
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.container}>
        {icon && (
          <View style={[styles.icon_container, styles.icon]}>
            <Feather
              name={icon}
              size={24}
              color={
                isFocused || isFilled
                  ? `${colors.WHITE}`
                  : `${colors.GRAY_INPUT_PLACEHOLDER}`
              }
            />
          </View>
        )}

        <NativeTextInput
          style={[
            styles.input_text,
            {
              color: `${
                isFocused || isFilled
                  ? `${colors.WHITE}`
                  : `${colors.GRAY_INPUT_PLACEHOLDER}`
              }`,
            },
          ]}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
          secureTextEntry={isSecurity}
        />

        {rest.secureTextEntry && (
          <TouchableOpacity
            style={[styles.icon_container, styles.secret]}
            onPress={() => setIsSecurity(!isSecurity)}
          >
            <Feather
              name={isSecurity ? 'eye' : 'eye-off'}
              size={24}
              color={
                isFocused || isFilled
                  ? `${colors.WHITE}`
                  : `${colors.GRAY_INPUT_PLACEHOLDER}`
              }
            />
          </TouchableOpacity>
        )}

        {status && (
          <View
            style={[
              styles.icon_container,
              styles.secret,
              { backgroundColor: `${isValid ? 'green' : 'red'}` },
            ]}
          ></View>
        )}
      </View>
    </>
  );
};

type IControlledTextInputProps = ITextInputProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues>;
  name: string;
  error?: FieldError;
};

export function ControlledTextInput({
  control,
  name,
  error,
  ...rest
}: IControlledTextInputProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}
