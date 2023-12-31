import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    paddingLeft: 8,
  },
  description: {
    fontSize: 14,
    color: `${colors.GRAY_DESCRIPTION}`,
    flexWrap: 'wrap',
  },
  container_info: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 10,
  },
  container_title: {
    marginTop: 10,
  },
  container_description: {
    alignItems: 'flex-start',
  },
  confirm_button_wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
  },
});

export default styles;
