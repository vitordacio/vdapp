import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.TEXT_DEFAULT}`,
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  text_default: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  text_red: {
    color: `${colors.RED}`,
  },
  text_blue: {
    color: `${colors.BLUE_LINK}`,
  },
  title: {
    fontSize: 24,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 17,
  },
  description: {
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 8,
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
