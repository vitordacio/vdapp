import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
  },
  radio: {
    width: 19,
    height: 19,
    borderRadius: 19 / 2,
  },
  error: {
    color: `${colors.RED}`,
    textAlign: 'center',
    height: 17,
    marginTop: -17,
    width: '100%',
  },
});
