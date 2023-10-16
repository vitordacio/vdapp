import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 15,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 17,
    // borderRadius: 8,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
  },
  icon_container: {
    height: 56,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
  },
  icon_container_focused: {
    borderBottomWidth: 2,
    borderBottomColor: `${colors.WHITE}`,
  },
  input_text: {
    flex: 1,
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
    paddingLeft: 23,
    paddingRight: 23,
  },
  input_text_focused: {
    borderBottomWidth: 2,
    borderBottomColor: `${colors.TEXT_DEFAULT}`,
  },
  error: {
    color: `${colors.RED}`,
    textAlign: 'center',
    height: 17,
    marginTop: -17,
    width: '100%',
  },
});
