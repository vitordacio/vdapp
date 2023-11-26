import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 150,
    // paddingHorizontal: 24,
    // paddingVertical: 10,
    padding: 8,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  cover_photo: {
    minWidth: 150,
    width: '100%',
    height: 150,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  container_data: {
    position: 'relative',
    paddingTop: 24,
    paddingHorizontal: 8,

    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
  data: {
    // position: 'relative',
    // paddingTop: 24,
    fontSize: 16,
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'red',
  },
  name: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  username: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
});
