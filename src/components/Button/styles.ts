import colors from '@styles/colors';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

const commonStyles: {
  container: ViewStyle;
  title: TextStyle;
  pressed_container?: ViewStyle;
  pressed_title?: ViewStyle;
} = {
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: `${colors.BUTTON_BACKGROUND}`,
  },
  title: { fontSize: 16, color: `${colors.BUTTON_TEXT}` },
  pressed_container: { opacity: 0.8 },
  pressed_title: {},
};

export default StyleSheet.create({
  ...commonStyles,

  dark_container: {
    backgroundColor: `${colors.BLACK}`,
    borderWidth: 1,
    borderColor: `${colors.WHITE}`,
  },
  dark_title: {
    color: `${colors.WHITE}`,
  },

  blue_container: { backgroundColor: `${colors.BLUE_BUTTON}`, maxWidth: 230 },
  blue_title: {
    color: `${colors.WHITE}`,
  },

  red_container: { backgroundColor: `${colors.RED}` },
  red_title: {
    color: `${colors.WHITE}`,
  },

  green_container: { backgroundColor: `${colors.GREEN}` },
  green_title: {
    color: `${colors.WHITE}`,
  },

  social_container: {
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
    height: 56,
  },
  social_title: {
    color: `${colors.WHITE}`,
  },
});
