import React, { useCallback, useEffect, useState } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { IUser } from '@interfaces/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userService } from '@services/User';
import CardUser from '@components/Card/User';
import useSearch from '@contexts/search';
import useMessage from '@contexts/message';
import styles from './styles';

let loadMore = true;

const SearchUser: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
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
      return <CardUser navigation={navigation} user={item} />;
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
    return <ActivityIndicator style={{ marginVertical: 16 }} size="large" />;
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
