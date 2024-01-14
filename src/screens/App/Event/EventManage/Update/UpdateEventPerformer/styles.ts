import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  confirm_button_wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
  },
  event_performers: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: `${colors.TEXT_DEFAULT}`,
    marginTop: 14,
  },
  event_performers_title: {
    marginVertical: 14,
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  performer_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    borderRadius: 8,
    marginBottom: 8,
  },
  performer_user: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 19,
  },
  performer_user_content: {
    justifyContent: 'center',
    fontSize: 16,
    flexDirection: 'column',
  },
  performer_name: {
    color: `${colors.TEXT_DEFAULT}`,
  },
  performer_username: {
    color: `${colors.GRAY_DESCRIPTION}`,
  },
});

export default styles;
