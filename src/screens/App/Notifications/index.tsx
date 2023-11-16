import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import useAuth from '@contexts/auth';
import React, { useCallback, useEffect, useState } from 'react';
// import CardUser from '@components/Card/User';
import { IUser } from '@interfaces/user';
import { ActivityIndicator, FlatList } from 'react-native';
import { INotification } from '@interfaces/notification';
import { notificationService } from '@services/Notification';
import { Text } from '@components/Text';
// import styles from './styles';

let loadMore = true;

const Notifications: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  // const { user } = useAuth();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Notificações',
    });
  }, [navigation]);

  const [data, setData] = useState<INotification[] | []>([]);
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    let notifications: INotification[];

    try {
      notifications = await notificationService.findNotifications({});

      loadMore = false;

      // if (notifications.length === 0) {
      //   loadMore = false;
      // }

      setData([...data, ...notifications]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <Text style={{ color: 'white' }}>{item.message}</Text>;
      // return <CardUser navigation={navigation} user={item} />;
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
    <AppView>
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
    </AppView>
  );
};

export default Notifications;
