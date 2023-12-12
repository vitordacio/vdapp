import React, { useCallback, useEffect, useState } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CardEventSearch from '@components/Card/Event/Search';
import useSearch from '@contexts/search';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import useMessage from '@contexts/message';
import styles from './styles';

let loadMore = true;

const SearchEvent: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { search, debouncedSearch, refreshing, setRefreshing } = useSearch();

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
      events = await eventService.searchEventByName({
        name: debouncedSearch,
        page: 1,
      });

      if (events.length === 0) {
        loadMore = false;
      }

      setData(events);
      setShowLoader(false);
      if (refreshing) setRefreshing(false);
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
      events = await eventService.searchEventByName({
        name: search,
        page,
      });

      if (events.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...events]);
      setPage(page + 1);
      setShowLoader(false);
      if (refreshing) setRefreshing(false);
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
      return <CardEventSearch navigation={navigation} event={item} />;
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

export default SearchEvent;
