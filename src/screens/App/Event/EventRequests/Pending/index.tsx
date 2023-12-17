import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import useEvent from '@contexts/event';
import { Loading } from '@components/View/Loading';
import useMessage from '@contexts/message';
import { participationService } from '@services/Participation';
import { IParticipation } from '@interfaces/participation';
import CardUserEventRequestPending from '@components/Card/User/EventRequestPending';
import styles from './styles';

let loadMore = true;

const EventRequestsPending: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { throwError } = useMessage();
  const { event } = useEvent();

  const [data, setData] = useState<IParticipation[] | []>([]);
  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    setShowLoader(true);

    let participations: IParticipation[];

    try {
      participations = await participationService.findRequestsPending({
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
      participations = await participationService.findRequestsPending({
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
    ({ item }: { item: IParticipation }) => {
      return (
        <CardUserEventRequestPending
          participation={item}
          navigation={navigation}
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
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Solicitações pendentes</Text>

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
      </ScrollView>
    </AppView>
  );
};

export default EventRequestsPending;
