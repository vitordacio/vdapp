import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    // minHeight: 150,
    padding: 8,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
  },
  cover_photo: {
    width: '100%',
    height: 150,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
  },
  container_data: {
    position: 'relative',
    paddingTop: 24,
    paddingHorizontal: 8,
    width: '100%',
  },
  data: {
    flex: 1,
    flexDirection: 'column',

    borderWidth: 1,
    borderColor: 'red',
  },
  data_text: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  data_icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 21,
    height: 21,
    marginRight: 10,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    color: `${colors.TEXT_DEFAULT}`,
    fontSize: 16,
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    color: `${colors.GRAY_DESCRIPTION}`,
    fontSize: 16,
  },
});
