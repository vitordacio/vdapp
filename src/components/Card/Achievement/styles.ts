import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
  },
  text_default_color: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  text_gray_color: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  difficulty_1: {
    borderColor: `${colors.TEXT_DEFAULT}`,
  },
  difficulty_2: {
    borderColor: `${colors.BLUE_LINK}`,
  },
  difficulty_3: {
    borderColor: `${colors.GOLD}`,
  },
});
