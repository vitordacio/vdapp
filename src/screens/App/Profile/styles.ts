import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingLeft: 8,
    paddingRight: 8,
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
  location: {
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
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;
