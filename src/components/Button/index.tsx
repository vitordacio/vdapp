import React from 'react';
import { Pressable } from '@components/Pressable';
import { Text, PressableProps, GestureResponderEvent } from 'react-native';
import { Loading } from '@components/View/Loading';
import { Icon } from '@components/Icon';
import styles from './styles';

// const svgMapping: Record<string, ImageSourcePropType> = {
//   inbox: assets.inbox,
//   smile: assets.smile,
//   map: assets.map,
// };

interface IButtonProps extends PressableProps {
  title?: string;
  type?: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  loading?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  maxWidth?: number;
  selected?: boolean;
  disabled?: boolean;
}

export function Button({
  title,
  onPress,
  type,
  icon,
  iconSize,
  iconColor,
  loading,
  maxWidth,
  selected,
  disabled,
  ...rest
}: IButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      {...rest}
      style={({ pressed }) => [
        styles.container,
        type && styles[`${type}_container`],
        (pressed || selected) && styles.pressed_container,
        disabled && { backgroundColor: '#808080' },
        maxWidth && { maxWidth },
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
            {loading && <Loading />}
            {icon && !loading && (
              <Icon
                name={icon}
                size={iconSize || 24}
                tintColor={iconColor || '#000'}
              />
            )}
          </>
        );
      }}
    </Pressable>
  );
}
