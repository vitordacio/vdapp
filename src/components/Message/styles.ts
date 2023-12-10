import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 84,
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: `${colors.BLUE_MESSAGE}`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginLeft: 8,
  },
});
