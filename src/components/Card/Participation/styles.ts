import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 8,
    backgroundColor: `${colors.BLACK}`,
    borderRadius: 8,
  },
  participation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: `${colors.GOLD}`,
    paddingBottom: 5,
    marginBottom: 5,
  },
  cover_photo: {
    width: '100%',
    height: 150,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
  },
  container_data: {
    position: 'relative',
    paddingHorizontal: 8,
    width: '100%',
    gap: 10,
    paddingTop: 15,
    // paddingVertical: 15,
  },
  status: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    width: 15,
    height: 15,
  },
  container_event: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 11,
  },
  data_text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
  text_large: {
    flex: 1,
    fontSize: 18,
  },
  text_medium: {
    flex: 1,
    fontSize: 14,
  },
  text_default_color: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  text_gold_color: {
    color: `${colors.GOLD}`,
  },
  text_gray_color: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  container_author: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  data_author: {
    marginLeft: 19,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  container_counts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    paddingVertical: 4,
  },
  data_counts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
