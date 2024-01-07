import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { IMoment } from '@interfaces/moment';
import { momentService } from '@services/Moment';
import useMessage from '@contexts/message';
import CardMomentThumb from '@components/Card/Moment/Thumb';
import { AppProps } from '@routes/App/app.routes';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

let loadMore = true;

const EventMoments: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;
  const { throwError } = useMessage();

  const [data, setData] = useState<IMoment[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const fetchData = async () => {
    setShowLoader(true);

    let moments: IMoment[];

    try {
      moments = await momentService.findByEventId({
        event_id: event.id_event,
        page: 1,
      });

      if (moments.length === 0) {
        loadMore = false;
      }

      setData(moments);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let moments: IMoment[];

    try {
      moments = await momentService.findByEventId({
        event_id: event.id_event,
        page,
      });

      if (moments.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...moments]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CardMomentThumb route={route} navigation={navigation} moment={item} />
      );
    },
    [data],
  );

  const keyExtractor = useCallback((item: IMoment) => `${item.id_moment}`, []);

  // const itemSeparatorComponent = useCallback(() => {
  //   return <View style={{ height: 14 }} />;
  // }, [data]);

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
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // ItemSeparatorComponent={itemSeparatorComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={showLoader && listFooterComponent}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        // columnWrapperStyle={styles.wrapper}
      />
    </View>
  );
};

export default EventMoments;
