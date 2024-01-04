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
  container_emoji: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  message: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 8,
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
  created_at: {
    marginTop: 5,
    width: '100%',
    textAlign: 'right',
    fontSize: 14,
    color: `${colors.GRAY_DESCRIPTION}`,
  },
});
