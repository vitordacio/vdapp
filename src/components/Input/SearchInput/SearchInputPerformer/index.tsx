import React, { useState } from 'react';
import { TextInputProps, TextInput } from 'react-native';
import { View } from '@components/View';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';
import styles from './styles';

export type ITextInputProps = TextInputProps & {
  value?: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInputPerformer = ({
  value,
  handleChange,
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
      <View style={[styles.icon_container, styles.left]}>
        <Icon
          name="mic"
          size={24}
          tintColor={
            isFocused || isFilled
              ? `${colors.WHITE}`
              : `${colors.GRAY_INPUT_PLACEHOLDER}`
          }
        />
      </View>

      <TextInput
        style={[
          styles.input_text,
          {
            color: `${
              (isFocused && isFilled) || isFilled
                ? `${colors.WHITE}`
                : `${colors.GRAY_INPUT_PLACEHOLDER}`
            }`,
          },
        ]}
        maxLength={80}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={async e => {
          handleChange(e);
          setIsFilled(!!e);
        }}
        placeholder="Insira um artista"
        {...rest}
      />
    </View>
  );
};
