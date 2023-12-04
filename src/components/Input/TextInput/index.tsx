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
  onChange?: (e: string) => void;
  icon?: React.ComponentProps<typeof Feather>['name'];
  value?: string;
  title?: string;
  status?: (data: string) => Promise<boolean>;
  lengthMax?: number;
  nullMargin?: boolean;
  setShowValue?: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
  width?: number;
};

export const TextInput = ({
  icon,
  value,
  title,
  status,
  onChange,
  lengthMax,
  nullMargin,
  setShowValue,
  defaultValue,
  width,
  ...rest
}: ITextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);
  const [isFilled, setIsFilled] = useState(!!defaultValue);
  const [isSecurity, setIsSecurity] = useState(rest.secureTextEntry);
  const [isValid, setIsValid] = useState(false);
  const [lengthCount, setLengthCount] = useState(0);

  function handleInputFocus() {
    setIsFocused(true);
  }

  async function handleInputBlur() {
    if (status) setIsValid(value ? await status(value) : false);
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View
        style={[
          styles.container,
          nullMargin && { marginBottom: 0, marginLeft: 0, marginRight: 0 },
        ]}
      >
        {icon && (
          <View style={[styles.icon_container, styles.left]}>
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
                (isFocused && isFilled) || isFilled
                  ? `${colors.WHITE}`
                  : `${colors.GRAY_INPUT_PLACEHOLDER}`
              }`,
            },
            lengthMax && { height: 96, paddingTop: 8 },
            icon
              ? { paddingLeft: 48, paddingRight: 48 }
              : { paddingLeft: 16, paddingRight: 16 },
            width && { width },
          ]}
          maxLength={lengthMax || undefined}
          textAlignVertical={lengthMax ? 'top' : 'auto'}
          multiline={!!lengthMax}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          onChangeText={async e => {
            onChange(e);
            setIsFilled(!!e);
            if (setShowValue) setShowValue(e);
            if (status) setIsValid(await status(e));
            if (lengthMax) setLengthCount(e.length);
          }}
          {...rest}
          secureTextEntry={isSecurity}
        />

        {rest.secureTextEntry && (
          <TouchableOpacity
            style={[styles.icon_container, styles.right]}
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
          <View style={[styles.icon_container, styles.right]}>
            {isValid ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <Feather name="x" size={24} color="red" />
            )}
          </View>
        )}

        {lengthMax && (
          <View style={styles.bottom_right}>
            <Text style={styles.length_count}>
              {lengthCount}/{lengthMax}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

type IControlledTextInputProps = ITextInputProps & {
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
          <TextInput onChange={onChange} value={value} {...rest} />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}
