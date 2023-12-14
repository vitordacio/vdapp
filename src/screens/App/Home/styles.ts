import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  description: {
    color: `${colors.TEXT_DEFAULT}`,
    fontSize: 16,
    marginTop: 18,
  },
});

export default styles;
