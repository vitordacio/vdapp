import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: `${colors.RED}`,
    textAlign: 'center',
    height: 17,
    width: '100%',
    marginBottom: 37,
  },
  event_private: {
    color: `${colors.TEXT_DEFAULT}`,
    textAlign: 'left',
    fontSize: 14,
  },
  details: {
    color: `${colors.GRAY_DESCRIPTION}`,
    fontSize: 16,
    marginBottom: 14,
  },
});
