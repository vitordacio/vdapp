import Feather from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import {
  TextInputProps,
  TextInput as NativeTextInput,
  TouchableOpacity,
} from 'react-native';
import { View } from '@components/View';
import colors from '@styles/colors';
import styles from './styles';

export type ITextInputProps = TextInputProps & {
  value?: string;
  handlePress: () => void;
};

export const SearchInput = ({
  handlePress,
  value,
  ...rest
}: ITextInputProps) => {
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
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.icon_container}>
        <Feather name="search" size={24} color={colors.TEXT_DEFAULT} />
      </TouchableOpacity>

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
        placeholder="Pesquisar"
        {...rest}
      />
    </View>
  );
};
