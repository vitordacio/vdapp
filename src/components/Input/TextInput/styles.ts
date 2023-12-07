import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 15,
  },
  container: {
    position: 'relative',
    marginBottom: 17,
    marginLeft: 8,
    marginRight: 8,
  },
  input_text: {
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
  },
  icon_container: {
    height: 40,
    width: 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
  },
  left: {
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  right: {
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  bottom_right: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 18,
    right: 18,
  },
  length_count: {
    fontSize: 14,
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  error: {
    color: `${colors.RED}`,
    textAlign: 'center',
    height: 17,
    marginTop: -17,
    width: '100%',
  },
});
