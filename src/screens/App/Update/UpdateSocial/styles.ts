import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  social_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 21,
  },
  social_wrapper: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  social: {
    width: 30,
    height: 30,
  },
  preview: {
    textAlign: 'center',
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
    paddingBottom: 16,
  },
  selected: {
    borderColor: `${colors.TEXT_DEFAULT}`,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  disabled: {
    borderColor: `${colors.GRAY_DESCRIPTION}`,
    borderWidth: 1,
    borderRadius: 8,
    opacity: 0.5,
  },
  button_wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  user_socials: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: `${colors.TEXT_DEFAULT}`,
    marginTop: 14,
  },
  user_socials_title: {
    marginVertical: 14,
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
  },
  user_social: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
    borderRadius: 8,
    marginBottom: 8,
  },
  user_social_username: {
    marginHorizontal: 22,
    width: '100%',
    fontSize: 16,
    color: `${colors.GRAY_DESCRIPTION}`,
  },
});
