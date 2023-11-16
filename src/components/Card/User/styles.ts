import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
    // marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    // gap: 19,
  },
  data: {
    marginLeft: 19,
    justifyContent: 'center',
    fontSize: 16,
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  username: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  friendship: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  error: {
    fontSize: 16,
    maxWidth: 326,
    height: 19,
    textAlign: 'center',
    color: `${colors.RED}`,
  },
});
