import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 32,
    paddingTop: 120,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picture_container: {
    position: 'relative',
  },
  camera: {
    position: 'absolute',
    right: 0,
    bottom: 0,
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
});

export default styles;
