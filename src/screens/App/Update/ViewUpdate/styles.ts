import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 17,
  },
  description: {
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 44,
  },
});

export default styles;
