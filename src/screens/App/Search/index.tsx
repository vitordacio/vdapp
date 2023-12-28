import { AppView } from '@components/View';
import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import { SearchTopRoutes } from '@routes/search.routes';
import useSearch from '@contexts/search';
import { AppProps } from '@routes/App/app.routes';

const Search: React.FC<AppProps> = ({ navigation, route }) => {
  const { search, setSearch, setRefreshing } = useSearch();

  return (
    <AppView style={{ paddingBottom: 14 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
          <SearchInput
            handlePress={() => setRefreshing(true)}
            onChangeText={e => setSearch(e)}
            value={search}
          />

          <SearchTopRoutes navigation={navigation} route={route} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AppView>
  );
};

export default Search;
