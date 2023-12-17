import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background_gray: {
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
  },
  loading: {
    width: 150,
    height: 150,
  },
});
