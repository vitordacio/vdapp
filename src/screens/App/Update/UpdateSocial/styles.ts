import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  social_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 21,
  },
  social_wrapper: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  social: {
    width: 30,
    height: 30,
  },
  preview: {
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
    paddingBottom: 16,
  },
  disabled: {
    backgroundColor: `${colors.WHITE}`,
    opacity: 0.5,
  },
});
