import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    color: '#fff',
    marginLeft: 16,
    marginRight: 16,
  },
});
