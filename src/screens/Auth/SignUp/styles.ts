import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 48,
  },
  login_text: {
    textAlign: 'center',
    color: `${colors.TEXT_DEFAULT}`,
  },
  login_link: {
    color: `${colors.BLUE_LINK}`,
  },
  button: {
    marginTop: 15,
    marginBottom: 48,
  },
});
