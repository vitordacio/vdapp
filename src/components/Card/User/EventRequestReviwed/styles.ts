import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 5,

    borderWidth: 1,
  },
  green_border: {
    borderColor: `${colors.GREEN}`,
  },
  red_border: {
    borderColor: `${colors.RED}`,
  },
  container_info: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    width: '100%',
    fontSize: 15,
    color: `${colors.TEXT_DEFAULT}`,
  },
  user: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 19,
    justifyContent: 'center',
    fontSize: 16,
    flexDirection: 'column',
  },
  name: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  username: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
});
