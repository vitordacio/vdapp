import React, { useState } from 'react';
import {
  TextInputProps,
  TextInput as NativeTextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from '@components/Icon';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Control, FieldValues, FieldError, Controller } from 'react-hook-form';
import colors from '@styles/colors';
import styles from './styles';

export type ITextInputProps = TextInputProps & {
  onChange?: (e: string) => void;
  icon?: string;
  value?: string;
  title?: string;
  status?: (data: string) => Promise<boolean>;
  lengthMax?: number;
  nullMargin?: boolean;
  setShowValue?: React.Dispatch<React.SetStateAction<string>>;
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
  width,
  ...rest
}: ITextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(!!value);
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
            <Icon
              name={icon}
              size={24}
              tintColor={
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
            lengthMax && { minHeight: 136, paddingTop: 8 },
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
          defaultValue={value}
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
            <Icon
              name={isSecurity ? 'eye' : 'eye-off'}
              size={24}
              tintColor={
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
              <Icon name="check" size={24} tintColor="green" />
            ) : (
              <Icon name="x" size={24} tintColor="red" />
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
  defaultValue?: string;
};

export function ControlledTextInput({
  control,
  name,
  error,
  defaultValue,
  ...rest
}: IControlledTextInputProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field: { onChange, value } }) => (
          <TextInput onChange={onChange} value={value} {...rest} />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}
