import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 26,
    gap: 32,

    borderRadius: 8,
    backgroundColor: `${colors.GRAY_CARD}`,
  },
  option: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 10,
  },
  title: {
    fontSize: 14,
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  description: {
    // marginTop: 10,

    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default styles;
