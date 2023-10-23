import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    textAlign: 'center',
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
  },
});

export default styles;
