import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import CardUser from '@components/Card/User';
import useDebounce from '@hooks/useDebounce';
import { AppProps } from '@routes/App/app.routes';
import useMessage from '@contexts/message';
import { Loading } from '@components/View/Loading';
import styles from './styles';

let loadMore = true;

const Friends: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwError } = useMessage();
  const { user_friends } = route.params;

  const [search, setSearch] = useState('');
  const [data, setData] = useState<IUser[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const fetchData = async () => {
    setShowLoader(true);

    let friends: IUser[];

    try {
      friends = await userService.findFriends({
        user_id: user_friends.id_user,
        page: 1,
        name: debouncedSearch,
      });

      if (friends.length === 0) {
        loadMore = false;
      }

      setData(friends);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let friends: IUser[];
    try {
      friends = await userService.findFriends({
        user_id: user_friends.id_user,
        page,
        name: search,
      });

      if (friends.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...friends]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <CardUser route={route} navigation={navigation} user={item} />;
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
  }, [debouncedSearch]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
          <SearchInput
            handlePress={() => fetchData()}
            onChangeText={e => setSearch(e)}
            value={search}
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

export default Friends;
