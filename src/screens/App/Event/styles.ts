import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cover_photo: {
    position: 'relative',
    width: '100%',
    height: 250,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
  },
  container_data: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 8,
    width: '100%',
    paddingTop: 20,
  },
  status: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 5,
    height: 20,
  },
  status_message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: `${colors.GREEN}`,
  },
  status_animation: {
    width: 20,
    height: 20,
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
  data_footer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 4,
    paddingHorizontal: 6,
    paddingBottom: 5,

    borderColor: `${colors.GRAY_DESCRIPTION}`,
    borderBottomWidth: 1,
  },
  container_author: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // paddingVertical: 8,
    width: '100%',
  },
  data_author: {
    marginLeft: 19,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },

  container_counts: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  data_counts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  container_participation: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  container_adm: {
    width: '100%',
    maxWidth: 615,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
  container_footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 16,
  },
  text_extra_large: {
    // flex: 1,
    fontSize: 22,
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
});

export default styles;
