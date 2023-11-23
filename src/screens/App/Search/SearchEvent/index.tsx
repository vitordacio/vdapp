import { Text } from '@components/Text';
import { View } from '@components/View';
import useSearch from '@contexts/search';
import styles from './styles';

const SearchEvent: React.FC = () => {
  const { search } = useSearch();
  // const debouncedSearch = useDebounce(search, 500);

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>{search}</Text>
    </View>
  );
};

export default SearchEvent;
