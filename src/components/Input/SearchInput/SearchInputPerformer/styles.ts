import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 17,
    marginLeft: 8,
    marginRight: 8,
  },
  input_text: {
    paddingLeft: 48,
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
});
