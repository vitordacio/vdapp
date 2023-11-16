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
import { IUser } from '@interfaces/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userService } from '@services/User';
import CardUser from '@components/Card/User';
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

  const [search, setSearch] = useState('');
  const [data, setData] = useState<IUser[] | []>([]);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    let friends: IUser[];

    try {
      friends = await userService.findFriends({
        user_id: user.id_user,
        page,
      });

      if (friends.length === 0) {
        loadMore = false;
      }

      setData([...data, ...friends]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendsSearch = async () => {
    setShowLoader(true);
    let friends: IUser[];

    try {
      if (!search) {
        friends = await userService.findFriends({
          user_id: user.id_user,
        });

        if (friends.length === 0) {
          loadMore = false;
        }

        setPage(2);
      } else {
        friends = await userService.searchUserByName({
          name: search,
        });
      }

      setData([...friends]);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
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
      setShowLoader(true);
      fetchData();
    }
  };

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator style={{ marginVertical: 16 }} size="large" />;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
          <SearchInput
            handlePress={handleFriendsSearch}
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
