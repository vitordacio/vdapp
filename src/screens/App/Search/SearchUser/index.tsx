import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import CardUser from '@components/Card/User';
import useSearch from '@contexts/search';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/app.routes';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

let loadMore = true;

const SearchUser: React.FC<AppProps> = ({ navigation, route }) => {
  const { search, debouncedSearch, refreshing, setRefreshing } = useSearch();
  const { throwError } = useMessage();

  const [data, setData] = useState<IUser[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

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
      return <CardUser navigation={navigation} route={route} user={item} />;
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
    <View style={styles.container}>
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
    </View>
  );
};

export default SearchUser;
