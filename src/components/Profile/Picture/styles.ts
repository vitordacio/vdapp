import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  picture_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    marginBottom: 8,
    backgroundColor: `${colors.WHITE}`,
  },
  picture_content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 116.25,
    height: 116.25,
    borderRadius: 116.25 / 2,
    backgroundColor: `${colors.VIEW_BACKGROUND}`,
  },
  picture: {
    height: 112.5,
    width: 112.5,
    borderRadius: 112.5 / 2,
    backgroundColor: `${colors.NO_CONTENT_PICTURE}`,
  },
  card_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: `${colors.WHITE}`,
  },
  card_content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42.63,
    height: 42.63,
    borderRadius: 42.63 / 2,
    backgroundColor: `${colors.VIEW_BACKGROUND}`,
  },
  card: {
    height: 41.25,
    width: 41.25,
    borderRadius: 41.25 / 2,
    backgroundColor: `${colors.NO_CONTENT_PICTURE}`,
  },
});

export default styles;
