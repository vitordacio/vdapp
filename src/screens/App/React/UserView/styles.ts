import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container_user: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  content_user: {
    marginLeft: 19,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16,
  },
  name: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  username: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  container_emoji: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  message: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 10,
  },
  created_at: {
    marginTop: 5,
    width: '100%',
    textAlign: 'right',
    fontSize: 14,
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 19,
  },
  button_wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_back: {
    marginBottom: 10,
  },
});

export default styles;
