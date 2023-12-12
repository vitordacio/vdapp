import React, { useCallback, useEffect, useState } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CardEventProfile from '@components/Card/Event/Profile';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import { IUser } from '@interfaces/user';
import useMessage from '@contexts/message';
import styles from './styles';

let loadMore = true;

type UserEventsProps = NativeStackScreenProps<ParamListBase> & {
  user: IUser;
};

const UserEvents: React.FC<UserEventsProps> = ({ navigation, user }) => {
  const { setMessage, setMessageType, handleEntering } = useMessage();

  const [data, setData] = useState<IEvent[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    setShowLoader(true);

    let events: IEvent[];
    let message: string;
    let msgType = 'info';

    try {
      events = await eventService.findByUserId({
        user_id: user.id_user,
        page: 1,
      });

      if (events.length === 0) {
        loadMore = false;
      }

      setData(events);
      setShowLoader(false);
    } catch (error) {
      msgType = 'alert';
      message = error.response.data.message;
    }

    if (msgType === 'alert') {
      setMessageType(msgType);
      setMessage(message);
      handleEntering();
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let events: IEvent[];
    let message: string;
    let msgType = 'info';

    try {
      events = await eventService.findByUserId({
        user_id: user.id_user,
        page,
      });

      if (events.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...events]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      msgType = 'alert';
      message = error.response.data.message;
    }

    if (msgType === 'alert') {
      setMessageType(msgType);
      setMessage(message);
      handleEntering();
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <CardEventProfile navigation={navigation} event={item} />;
    },
    [data],
  );

  const keyExtractor = useCallback((item: IEvent) => `${item.id_event}`, []);

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
  }, []);

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

export default UserEvents;
