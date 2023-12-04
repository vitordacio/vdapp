import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable } from '@components/Pressable';
import {
  Text,
  PressableProps,
  GestureResponderEvent,
  ImageBackground,
  ImageSourcePropType,
  ActivityIndicator,
} from 'react-native';
import assets from '@assets/index';
import styles from './styles';

const svgMapping: Record<string, ImageSourcePropType> = {
  inbox: assets.inbox,
  smile: assets.smile,
  map: assets.map,
};

interface IButtonProps extends PressableProps {
  title?: string;
  type?: string;
  icon?: React.ComponentProps<typeof Feather>['name'];
  iconSize?: number;
  svgSize?: number;
  iconColor?: string;
  loading?: boolean;
  svg?: keyof typeof svgMapping;
  onPress?: (e: GestureResponderEvent) => void;
}

export function Button({
  title,
  onPress,
  type,
  icon,
  iconSize,
  iconColor,
  svgSize,
  loading,
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
            {title && !loading && (
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
            {loading && <ActivityIndicator size="small" />}
            {icon && (
              <Feather
                name={icon}
                size={iconSize || 24}
                color={iconColor || 'black'}
              />
            )}
            {svg && (
              <ImageBackground
                style={
                  svgSize
                    ? { width: svgSize, height: svgSize }
                    : { width: 24, height: 24 }
                }
                source={svgMapping[svg]}
              />
            )}
          </>
        );
      }}
    </Pressable>
  );
}
