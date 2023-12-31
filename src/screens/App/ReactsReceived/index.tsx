import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import useDebounce from '@hooks/useDebounce';
import { AppProps } from '@routes/App/app.routes';
import useMessage from '@contexts/message';
import { Loading } from '@components/View/Loading';
import { IReact } from '@interfaces/react';
import { reactService } from '@services/React';
import CardReact from '@components/Card/React';
import styles from './styles';

let loadMore = true;

const ReactsReceived: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwError } = useMessage();
  const { user_reacts_received } = route.params;

  const [search, setSearch] = useState('');
  const [data, setData] = useState<IReact[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const fetchData = async () => {
    setShowLoader(true);

    let reacts: IReact[];

    try {
      reacts = await reactService.findReactsReceivedUser({
        user_id: user_reacts_received.id_user,
        page: 1,
        name: debouncedSearch,
      });

      if (reacts.length === 0) {
        loadMore = false;
      }

      setData(reacts);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let reacts: IReact[];
    try {
      reacts = await reactService.findReactsReceivedUser({
        user_id: user_reacts_received.id_user,
        page,
        name: search,
      });

      if (reacts.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...reacts]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: IReact }) => {
      return (
        <CardReact
          route={route}
          navigation={navigation}
          react={item}
          user={item.author}
        />
      );
    },
    [data],
  );

  const keyExtractor = useCallback((item: IReact) => `${item.id_react}`, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ height: 14 }} />;
  }, [data]);

  const onEndReached = () => {
    if (loadMore) {
      fetchNewData();
    }
  };

  const listFooterComponent = useCallback(() => {
    return <Loading size={80} />;
  }, []);

  useEffect(() => {
    fetchData();
  }, [debouncedSearch]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
          <SearchInput
            handlePress={() => fetchData()}
            onChangeText={e => setSearch(e)}
            value={search}
            placeholder="Pesquisar por autor"
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={itemSeparatorComponent}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
            ListFooterComponent={showLoader && listFooterComponent}
            showsVerticalScrollIndicator={false}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ReactsReceived;
