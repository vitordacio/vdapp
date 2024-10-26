import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 14,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 120,
  },
  username: {
    textAlign: 'center',
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 8,
  },
  counts: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 27,
    marginBottom: 21,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 21,
  },
  container_text: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 8,
    maxWidth: 250,
  },
  private: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 5,
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
