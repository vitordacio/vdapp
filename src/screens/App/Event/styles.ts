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
    gap: 10,
    paddingTop: 20,
    paddingBottom: 8,
  },
  status: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
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
  },
  data_text: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  data_footer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

    borderColor: `${colors.GRAY_DESCRIPTION}`,
    borderBottomWidth: 1,
  },
  container_author: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    width: '100%',
  },
  data_author: {
    marginLeft: 19,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  container_actions: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    paddingVertical: 8,
  },
  container_counts: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 22,
  },
  counts: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  counts_description: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  line_y: {
    width: 1,
    height: '100%',
    backgroundColor: '#fff',
    marginHorizontal: 16,
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
  container_buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  container_footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  text_extra_large: {
    flex: 1,
    fontSize: 22,
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
  text_gray_color: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
});

export default styles;
