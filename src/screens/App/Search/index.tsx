import { AppView } from '@components/View';
import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import { Text } from '@components/Text';
import { SearchTopRoutes } from '@routes/search.routes';
import { useNavigation } from '@react-navigation/native';
import useSearch from '@contexts/search';
import styles from './styles';

const Search: React.FC = () => {
  const { search, setSearch, responseError, setRefreshing } = useSearch();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Explorar',
    });
  }, [navigation]);

  return (
    <AppView style={{ paddingBottom: 14 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
          <SearchInput
            handlePress={() => setRefreshing(true)}
            onChangeText={e => setSearch(e)}
            value={search}
          />
          {responseError && <Text style={styles.error}>{responseError}</Text>}

          <SearchTopRoutes />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AppView>
  );
};

export default Search;
