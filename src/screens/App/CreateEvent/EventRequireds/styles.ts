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
  datetime_container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',

    borderWidth: 1,
    borderColor: 'green',
  },
  datetime_title: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 15,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 19,
  },
  radio_wrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 19 / 2,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#075985',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  private_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  private_title: {
    marginTop: 6,
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
  },
  private_switch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  private_description: {
    color: `${colors.GRAY_DESCRIPTION}`,
    textAlign: 'left',
    fontSize: 14,
  },
  marginLeft: {
    marginLeft: 8,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;
