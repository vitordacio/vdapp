import React, { useCallback, useEffect, useState } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useSearch from '@contexts/search';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import CardEvent from '@components/Card/Event';
import useMessage from '@contexts/message';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

let loadMore = true;

const SearchEvent: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { search, debouncedSearch, refreshing, setRefreshing } = useSearch();

  const { throwError } = useMessage();

  const [data, setData] = useState<IEvent[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    setShowLoader(true);

    let events: IEvent[];

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
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let events: IEvent[];

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
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <CardEvent navigation={navigation} event={item} />;
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

export default SearchEvent;
