import colors from '@styles/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  division: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  or: {
    marginVertical: 14,
    fontSize: 12,
    color: `${colors.TEXT_DEFAULT}`,
  },
  select_description: {
    marginBottom: 14,
    fontSize: 16,
    color: `${colors.TEXT_DEFAULT}`,
  },
});

export default styles;
