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
    marginBottom: 14,
    alignItems: 'center',
    gap: 19,
  },
  data: {
    justifyContent: 'center',
    fontSize: 16,
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  name: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
});
