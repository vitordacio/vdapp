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
import CardUserEventRequestRevivew from '@components/Card/User/EventRequestReviwed';
import { IEvent } from '@interfaces/event';
import styles from './styles';

let loadMore = true;

const EventRequestsReviwed: React.FC<
  { event: IEvent } & NativeStackScreenProps<ParamListBase>
> = ({ navigation, event }) => {
  const { eventRequestsReviwed, setEventRequestsReviwed } = useEvent();
  const { throwError } = useMessage();

  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async () => {
    setShowLoader(true);

    let participations: IParticipation[];

    try {
      participations = await participationService.findRequestsReviwed({
        event_id: event.id_event,
        page: 1,
      });

      if (participations.length === 0) {
        loadMore = false;
      }

      setEventRequestsReviwed(participations);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchNewData = async () => {
    setShowLoader(true);
    let participations: IParticipation[];

    try {
      participations = await participationService.findRequestsReviwed({
        event_id: event.id_event,
        page,
      });

      if (participations.length === 0) {
        loadMore = false;
      }

      setEventRequestsReviwed(prev => [...prev, ...participations]);
      setPage(page + 1);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: IParticipation }) => {
      return (
        <CardUserEventRequestRevivew
          participation={item}
          navigation={navigation}
        />
      );
    },
    [eventRequestsReviwed],
  );

  const keyExtractor = useCallback(
    (item: IParticipation) => `${item.id_participation}`,
    [],
  );

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ height: 14 }} />;
  }, [eventRequestsReviwed]);

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
        <Text style={styles.title}>Solicitações revisadas</Text>

        <FlatList
          data={eventRequestsReviwed}
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

export default EventRequestsReviwed;
