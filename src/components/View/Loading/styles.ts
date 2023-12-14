import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 22,
    textAlign: 'center',
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 16,
  },
  loading: {
    width: 150,
    height: 150,
  },
});
