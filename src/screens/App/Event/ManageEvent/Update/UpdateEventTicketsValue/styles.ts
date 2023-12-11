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
  container_min_amount: {
    position: 'relative',
    marginBottom: 17,
    marginLeft: 8,
    marginRight: 8,
  },
  title_min_amount: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 15,
  },
  input_min_amount: {
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: `${colors.GRAY_INPUT_BACKGROUND}`,
    paddingLeft: 16,
    paddingRight: 16,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;
