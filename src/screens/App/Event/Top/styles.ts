import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    paddingHorizontal: 14,
    paddingVertical: 25,
  },
});

export default styles;
