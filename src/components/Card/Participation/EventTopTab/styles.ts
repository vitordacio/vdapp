import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  created_at: {
    marginTop: 5,
    width: '100%',
    textAlign: 'right',
    fontSize: 14,
    color: `${colors.GRAY_DESCRIPTION}`,
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
});
