import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 14,

    flex: 1,
    height: 84,
    gap: 6,

    backgroundColor: `${colors.GRAY_CARD}`,
    borderRadius: 8,
  },
  verified: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 16,
    height: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
