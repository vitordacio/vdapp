import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 14,
    // marginBottom: 34,
    minHeight: 40,
  },
  input_text: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
    paddingLeft: 25,
    paddingRight: 56,
  },
  icon_container: {
    position: 'absolute',
    right: 16,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
  },

  error: {
    color: `${colors.RED}`,
    textAlign: 'center',
    height: 17,
    marginTop: -17,
    width: '100%',
  },
});
