import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 5,
  },
  color_blue: {
    color: `${colors.BLUE_BUTTON}`,
  },
  color_red: {
    color: `${colors.RED}`,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 14,
  },

  submit: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    // marginBottom: 16,
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
    // marginBottom: 8,
  },
});

export default styles;