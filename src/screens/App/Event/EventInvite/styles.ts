import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 8,
  },
});

export default styles;
