import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { LineX } from '@components/Line';
import { Text } from '@components/Text';
import { FlatList } from 'react-native-gesture-handler';
import useMessage from '@contexts/message';
import { IUser } from '@interfaces/user';
import CardUserPerformer from '@components/Card/User/Performer';
import { Loading } from '@components/View/Loading';
import { userService } from '@services/User';
import useDebounce from '@hooks/useDebounce';
import { SearchInputPerformer } from '@components/Input/SearchInput/SearchInputPerformer';
import generalStyle from '../../styles';
import styles from './styles';

let loadMore = true;

const EventSelectPerformer: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwError } = useMessage();

  const [search, setSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);
  const [data, setData] = useState<IUser[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const handleCreatePerformerName = async () => {
    route.params.updateEventPerformer = {
      create_data: {
        type: 'name',
        data: search,
      },
    };
    navigation.push('EventCreatePerformer');
  };

  const fetchData = async () => {
    setShowLoader(true);

    let users: IUser[];

    try {
      users = await userService.searchUserByName({
        name: debouncedSearch,
        page: 1,
      });

      if (users.length === 0) {
        loadMore = false;
      }

      setData(users);
      setShowLoader(false);
      if (refreshing) setRefreshing(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let users: IUser[];

    try {
      users = await userService.searchUserByName({
        name: search,
        page,
      });

      if (users.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...users]);
      setPage(page + 1);
      setShowLoader(false);
      if (refreshing) setRefreshing(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CardUserPerformer navigation={navigation} route={route} user={item} />
      );
    },
    [data],
  );

  const keyExtractor = useCallback((item: IUser) => `${item.id_user}`, []);

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
  }, [debouncedSearch, refreshing]);

  return (
    <ViewUpdate
      name="Artista"
      description="Você pode adicionar quantos artistas desejar."
    >
      <SearchInputPerformer handleChange={setSearch} value={search} />

      <View style={generalStyle.confirm_button_wrapper}>
        <Button
          onPress={
            search
              ? handleCreatePerformerName
              : () => throwError('Informe um nome')
          }
          title="Continuar"
        />
      </View>

      <View style={styles.division}>
        <LineX />
        <Text style={styles.or}>OU</Text>
        <LineX />
      </View>

      <Text style={styles.select_description}>Selecione um usuário</Text>

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
    </ViewUpdate>
  );
};

export default EventSelectPerformer;
