import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 8,
  },
  title: {
    fontSize: 18,
    color: `${colors.TEXT_DEFAULT}`,
    width: '100%',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: `${colors.GRAY_DESCRIPTION}`,
    width: '100%',
  },
  button_wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 37,
  },
});

export default styles;
