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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
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
  participation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,
  },
  participation_button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
