import { View } from '@components/View';
import { IUser } from '@interfaces/user';
import { FindFriends } from '@services/User/FindFriends';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

const user_id = '';

let limit = 20;
let loadMore = true;

const FriendsList = () => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let friends: IUser[];

    try {
      friends = await FindFriends(user_id);
      if (friends.length === 0) {
        loadMore = false;
      }

      setData([...data, ...friends]);
      setSkip(skip + 20);
      setShowLoader(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <View>{item.name}</View>;
    },
    [data],
  );

  const keyExtractor = useCallback(item => `${item.id_user}`, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ height: 20 }} />;
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

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={itemSeparatorComponent}
      onEndReached={onEndReached}
      ListFooterComponent={showLoader && listFooterComponent}
    />
  );
};

export { FriendsList };
