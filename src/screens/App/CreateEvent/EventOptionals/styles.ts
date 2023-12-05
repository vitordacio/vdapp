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
  input_min_amount: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  confirm_button_wrapper: {
    marginTop: 36,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;
