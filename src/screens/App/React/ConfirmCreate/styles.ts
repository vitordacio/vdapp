import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  message_info: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginVertical: 10,
  },
  confirm_button_wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
  },
});

export default styles;
