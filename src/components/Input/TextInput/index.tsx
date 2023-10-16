// import { Feather } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import { TextInputProps, TextInput as NativeTextInput } from 'react-native';
import { Text } from '@components/Text';
import { View } from '@components/View';
import colors from '@styles/colors';
import styles from './styles';

export type ITextInputProps = TextInputProps & {
  icon?: React.ComponentProps<typeof Feather>['name'];
  value?: string;
  title?: string;
};

export function TextInput({ icon, value, title, ...rest }: ITextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <View
          style={[
            styles.icon_container,
            isFocused && styles.icon_container_focused,
          ]}
        >
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

        <NativeTextInput
          style={[
            styles.input_text,
            isFocused && styles.input_text_focused,
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
          // value={value}
          {...rest}
        />
      </View>
    </>
  );
}
