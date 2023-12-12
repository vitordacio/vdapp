import { AppView } from '@components/View';
import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import { SearchTopRoutes } from '@routes/search.routes';
import { useNavigation } from '@react-navigation/native';
import useSearch from '@contexts/search';

const Search: React.FC = () => {
  const { search, setSearch, setRefreshing } = useSearch();
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

          <SearchTopRoutes />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AppView>
  );
};

export default Search;
