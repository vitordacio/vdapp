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
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 17,
    minHeight: 40,
    marginLeft: 8,
    marginRight: 8,
  },
  input_text: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
    paddingLeft: 56,
    paddingRight: 56,
    // paddingLeft: 48,
    // paddingRight: 48,
  },
  icon_container: {
    position: 'absolute',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
  },
  icon: {
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  secret: {
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  error: {
    color: `${colors.RED}`,
    textAlign: 'center',
    height: 17,
    marginTop: -17,
    width: '100%',
  },
});
