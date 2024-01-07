import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { IParticipation } from '@interfaces/participation';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/App/app.routes';
import { participationService } from '@services/Participation';
import { Loading } from '@components/View/Loading';
import CardParticipationEventTopTab from '@components/Card/Participation/EventTopTab';
import styles from '../styles';

let loadMore = true;

const EventParticipations: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;
  const { throwError } = useMessage();

  const [data, setData] = useState<IParticipation[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const fetchData = async () => {
    setShowLoader(true);

    let participations: IParticipation[];

    try {
      participations = await participationService.findByEventId({
        event_id: event.id_event,
        page: 1,
      });

      if (participations.length === 0) {
        loadMore = false;
      }

      setData(participations);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let participations: IParticipation[];

    try {
      participations = await participationService.findByEventId({
        event_id: event.id_event,
        page,
      });

      if (participations.length === 0) {
        loadMore = false;
      }

      setData(prev => [...prev, ...participations]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CardParticipationEventTopTab
          route={route}
          navigation={navigation}
          participation={item}
        />
      );
    },
    [data],
  );

  const keyExtractor = useCallback(
    (item: IParticipation) => `${item.id_participation}`,
    [],
  );

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

export default EventParticipations;
