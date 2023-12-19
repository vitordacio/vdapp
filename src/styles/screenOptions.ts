import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import colors from './colors';

type screenOptionsProps = {
  title?: string;
  backgroundColor?: string;
  color?: string;
  tintColor?: string;
  titleAlign?: 'center' | 'left';
};

export const screenOptionsDefault = ({
  title,
  backgroundColor,
  color,
  tintColor,
  titleAlign,
}: screenOptionsProps): NativeStackNavigationOptions => {
  return {
    headerTitle: title || undefined,
    headerStyle: {
      backgroundColor: backgroundColor || `${colors.BLACK}`,
    },
    headerTitleStyle: {
      color: color || `${colors.WHITE}`,
    },
    headerTintColor: tintColor || `${colors.WHITE}`,
    headerTitleAlign: titleAlign || 'center',
  };
};

type screenOptionsTopProps = {
  color?: string;
  backgroundColor?: string;
  colorSelected?: string;
};

export const screenOptionsTopDefault = ({
  color,
  backgroundColor,
  colorSelected,
}: screenOptionsTopProps): MaterialTopTabNavigationOptions => {
  return {
    tabBarLabelStyle: { color: color || `${colors.WHITE}` },
    tabBarStyle: { backgroundColor: backgroundColor || `${colors.BLACK}` },
    tabBarIndicatorStyle: {
      backgroundColor: colorSelected || `${colors.GOLD}`,
    },
  };
};
