import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 26,
    borderRadius: 8,
    backgroundColor: `${colors.GRAY_CARD}`,
    paddingLeft: 65,
  },
  title: {
    fontSize: 14,
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 26,
    bottom: 26,
  },
});

export default styles;
