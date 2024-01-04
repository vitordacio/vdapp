import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginLeft: 19,
    justifyContent: 'center',
    fontSize: 16,
    flexDirection: 'column',
    width: '100%',
  },
  name: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  username: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  friendship: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
