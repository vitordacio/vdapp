import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: `${colors.VIEW_BACKGROUND}`,
  },
  control: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: 14,
  },
  image: {
    width: '100%',
    height: 517.2,
    backgroundColor: `${colors.GRAY_BACKGROUND}`,
  },
  container_author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 14,
    marginVertical: 5,
  },
  author: {
    fontSize: 14,
    color: `${colors.BLUE_LINK}`,
  },
  container_data: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 24,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
    marginBottom: 8,
  },
  created_at: {
    fontSize: 12,
    color: `${colors.GRAY_DESCRIPTION}`,
    marginBottom: 8,
  },
});

export default styles;
