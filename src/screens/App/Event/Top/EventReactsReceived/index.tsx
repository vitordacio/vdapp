import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/App/app.routes';
import { Loading } from '@components/View/Loading';
import { IReact } from '@interfaces/react';
import { reactService } from '@services/React';
import CardReact from '@components/Card/React';
import styles from '../styles';

let loadMore = true;

const EventReactsReceived: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;
  const { throwError } = useMessage();

  const [data, setData] = useState<IReact[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const fetchData = async () => {
    setShowLoader(true);

    let reacts: IReact[];

    try {
      reacts = await reactService.findReactsEvent({
        event_id: event.id_event,
        page: 1,
      });

      if (reacts.length === 0) {
        loadMore = false;
      }

      setData(reacts);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let reacts: IReact[];

    try {
      reacts = await reactService.findReactsEvent({
        event_id: event.id_event,
        page,
      });

      if (reacts.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...reacts]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: IReact }) => {
      return (
        <CardReact
          route={route}
          navigation={navigation}
          react={item}
          user={item.author}
        />
      );
    },
    [data],
  );

  const keyExtractor = useCallback((item: IReact) => `${item.id_react}`, []);

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

export default EventReactsReceived;
