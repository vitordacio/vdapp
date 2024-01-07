import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: 136,
    height: 136,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 0.5,
    borderColor: '#000',
  },
  thumb: {
    width: '100%',
    height: '100%',
    backgroundColor: `${colors.NO_CONTENT_PICTURE}`,
  },
});
