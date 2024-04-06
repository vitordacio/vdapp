import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 48,
  },
  transition: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 48,
    marginTop: 48,
  },
  half_line: {
    flex: 1,
    backgroundColor: `${colors.LINE}`,
    height: 1,
  },
  or: {
    color: `${colors.WHITE}`,
    marginLeft: 16,
    marginRight: 16,
  },
  signup_text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: `${colors.TEXT_DEFAULT}`,
    marginTop: 48,
  },
  signup_link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: `${colors.BLUE_LINK}`,
  },
  button: {
    marginTop: 15,
    // marginBottom: 48,
  },
});
