import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.GRAY_BACKGROUND_POP}`,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    padding: 14,
    backgroundColor: `${colors.WHITE}`,
    paddingBottom: 32,
  },
  close_content: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    maxWidth: 326,
    marginBottom: 16,
    textAlign: 'center',
    color: `${colors.BLACK}`,
  },
  description: {
    fontSize: 18,
    maxWidth: 326,
    marginBottom: 48,
    textAlign: 'center',
    color: `${colors.BLACK}`,
  },
  error: {
    fontSize: 16,
    maxWidth: 326,
    height: 19,
    textAlign: 'center',
    color: `${colors.RED}`,
  },
});

export default styles;
