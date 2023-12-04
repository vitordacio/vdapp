import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 17,
    paddingHorizontal: 14,
  },
  text: {
    flex: 1,
    paddingLeft: 9,
    color: `${colors.TEXT_DEFAULT}`,
  },
  title: {
    fontSize: 24,
    marginBottom: 17,
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;
