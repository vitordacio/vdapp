import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 5,
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 8,
  },
  color_blue: {
    color: `${colors.BLUE_BUTTON}`,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginVertical: 14,
  },
  container_button: {
    paddingVertical: 16,
  },
});

export default styles;
