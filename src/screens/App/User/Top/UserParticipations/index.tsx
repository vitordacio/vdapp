import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { IParticipation } from '@interfaces/participation';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/App/app.routes';
import { participationService } from '@services/Participation';
import { IEvent } from '@interfaces/event';
import CardEvent from '@components/Card/Event';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

let loadMore = true;

const UserParticipations: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const { throwError } = useMessage();

  const [data, setData] = useState<IEvent[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const fetchData = async () => {
    setShowLoader(true);

    let participations: IParticipation[];

    try {
      participations = await participationService.findByUserId({
        user_id: user.id_user,
        page: 1,
      });

      if (participations.length === 0) {
        loadMore = false;
      }

      const events = participations.map(participation => participation.event);

      setData(events);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let participations: IParticipation[];

    try {
      participations = await participationService.findByUserId({
        user_id: user.id_user,
        page,
      });

      if (participations.length === 0) {
        loadMore = false;
      }

      const events = participations.map(participation => participation.event);

      setData(prev => [...prev, ...events]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <CardEvent route={route} navigation={navigation} event={item} />;
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

export default UserParticipations;
