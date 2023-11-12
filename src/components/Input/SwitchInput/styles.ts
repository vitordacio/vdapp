import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 37,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: `${colors.RED}`,
    textAlign: 'center',
    height: 17,
    marginTop: -17,
    width: '100%',
  },
});
