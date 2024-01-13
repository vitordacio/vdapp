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
    borderWidth: 1,
  },
  verified: {
    borderColor: `${colors.GOLD}`,
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
    paddingHorizontal: 6,
  },
  event_data: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  data_text: {
    marginLeft: 10,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  performer_name: {
    marginLeft: 2,
    marginRight: 6,
    color: `${colors.TEXT_DEFAULT}`,
  },
  text_large: {
    fontSize: 18,
  },
  text_medium: {
    fontSize: 14,
  },
  text_default_color: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  text_gray_color: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  text_gold_color: {
    color: `${colors.GOLD}`,
  },
  text_link_color: {
    color: `${colors.BLUE_LINK}`,
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
