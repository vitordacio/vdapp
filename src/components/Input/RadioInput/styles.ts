import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 19,
  },
  title: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
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
});
