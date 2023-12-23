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
  user_private: {
    color: `${colors.TEXT_DEFAULT}`,
    textAlign: 'left',
    fontSize: 14,
    marginBottom: 37,
  },
  details: {
    color: `${colors.GRAY_DESCRIPTION}`,
    fontSize: 16,
    marginBottom: 14,
  },
});
