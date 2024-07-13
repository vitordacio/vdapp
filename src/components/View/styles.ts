import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  app_view: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: `${colors.VIEW_BACKGROUND}`,
    // flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 32,
  },
});
