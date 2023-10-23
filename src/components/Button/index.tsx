import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable } from '@components/Pressable';
import {
  Text,
  PressableProps,
  GestureResponderEvent,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import assets from '@assets/index';
import styles from './styles';

const svgMapping: Record<string, ImageSourcePropType> = {
  inbox: assets.inbox,
};

interface IButtonProps extends PressableProps {
  title?: string;
  type?: string;
  icon?: React.ComponentProps<typeof Feather>['name'];
  svg?: keyof typeof svgMapping;
  onPress?: (e: GestureResponderEvent) => void;
}

export function Button({
  title,
  onPress,
  type,
  icon,
  svg,
  ...rest
}: IButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      {...rest}
      style={({ pressed }) => [
        styles.container,
        type && styles[`${type}_container`],
        pressed && styles.pressed_container,
        rest.style,
      ]}
    >
      {({ pressed }) => {
        return (
          <>
            {title && (
              <Text
                style={[
                  styles.title,
                  type && styles[`${type}_title`],
                  pressed && styles.pressed_title,
                ]}
              >
                {title}
              </Text>
            )}
            {icon && <Feather name={icon} size={24} color="black" />}
            {svg && (
              <ImageBackground
                style={{ width: 24, height: 24 }}
                source={svgMapping[svg]}
              />
            )}
          </>
        );
      }}
    </Pressable>
  );
}
