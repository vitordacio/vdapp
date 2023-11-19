import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    padding: 14,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
  friends: {},
});

export default styles;
