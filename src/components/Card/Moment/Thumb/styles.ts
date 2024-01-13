import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    minWidth: 136,
    height: 136,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    width: '100%',
    height: '100%',
    backgroundColor: `${colors.NO_CONTENT_PICTURE}`,
  },
});
