import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.BLACK}`,
  },
  text_welcome: { fontSize: 36, color: `${colors.WHITE}`, marginBottom: 8 },
  text_app_name: { fontSize: 48, color: `${colors.WHITE}` },
  buttons: {
    position: 'absolute',
    width: '100%',
    padding: 8,
    gap: 8,
    bottom: '15%',
  },
});
