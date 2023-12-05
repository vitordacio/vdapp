import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    flex: 1,
    paddingLeft: 9,
    color: `${colors.TEXT_DEFAULT}`,
  },
  title: {
    fontSize: 24,
    marginBottom: 17,
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
  },
  confirm_button_wrapper: {
    marginTop: 36,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  data_text: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    width: 21,
    height: 21,
  },
  text_large: {
    flex: 1,
    fontSize: 18,
  },
  text_medium: {
    flex: 1,
    fontSize: 14,
  },
  text_default_color: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  text_gray_color: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;
