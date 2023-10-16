import React from 'react';
import {
  Text,
  Pressable,
  PressableProps,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';

interface IButtonProps extends PressableProps {
  title: string;
  type?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export function Button({ title, onPress, type, ...rest }: IButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        type && styles[`${type}_container`],
        pressed && styles.pressed_container,
      ]}
      onPress={onPress}
      {...rest}
    >
      {({ pressed }) => {
        return (
          <Text
            style={[
              styles.title,
              type && styles[`${type}_title`],
              pressed && styles.pressed_title,
            ]}
          >
            {title}
          </Text>
        );
      }}
    </Pressable>
  );
}
