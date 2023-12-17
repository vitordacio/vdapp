import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 14,
    paddingVertical: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picture_container: {
    position: 'relative',
    marginBottom: 16,
  },
  camera: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 4,
    bottom: 4,
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: `${colors.BLACK}`,
    borderWidth: 1,
    borderColor: `${colors.TEXT_DEFAULT}`,
  },
  edit_username: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  username: {
    textAlign: 'center',
    fontSize: 20,
    color: `${colors.TEXT_DEFAULT}`,
  },
  options: {
    width: '100%',
    gap: 16,
  },
  confirm_button_wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
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