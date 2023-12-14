import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 22,
    textAlign: 'center',
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 16,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 5,
    borderColor: `${colors.GRAY_DESCRIPTION}`,
  },
});
