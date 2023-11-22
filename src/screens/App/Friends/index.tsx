/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { ParamListBase, useRoute } from '@react-navigation/native';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SearchInput } from '@components/Input/SearchInput';
import { Text } from '@components/Text';
import { IUser } from '@interfaces/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userService } from '@services/User';
import CardUser from '@components/Card/User';
import useDebounce from '@hooks/useDebounce';
import styles from './styles';

type UserParam = ParamListBase & {
  user?: IUser;
};

let loadMore = true;

const Friends: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const route = useRoute();
  const { user } = route.params as UserParam;

  const [responseError, setResponseError] = useState();
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
        user_id: user.id_user,
        page: 1,
        name: debouncedSearch,
      });

      if (friends.length === 0) {
        loadMore = false;
      }

      setData(friends);
      setShowLoader(false);
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let friends: IUser[];
    console.log('page on new', page);
    try {
      friends = await userService.findFriends({
        user_id: user.id_user,
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
      setResponseError(error.response.data.message);
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
          {responseError && <Text style={styles.error}>{responseError}</Text>}
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
