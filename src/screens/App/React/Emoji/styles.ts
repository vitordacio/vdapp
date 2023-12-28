import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    paddingHorizontal: 14,
    paddingVertical: 25,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
});

export default styles;
