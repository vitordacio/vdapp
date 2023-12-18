import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import useEvent from '@contexts/event';
import { Loading } from '@components/View/Loading';
import useMessage from '@contexts/message';
import { participationService } from '@services/Participation';
import { IParticipation } from '@interfaces/participation';
import CardUserEventRequestPending from '@components/Card/User/EventRequestPending';
import { IEventResponse } from '@services/Participation/IParticipationService';
import useAuth from '@contexts/auth';
import { EventAndOnUpdateProps } from '@routes/event.routes';
import styles from './styles';

let loadMore = true;

const EventRequestsPending: React.FC<EventAndOnUpdateProps> = ({
  route,
  navigation,
}) => {
  const { event } = route.params;
  const { user } = useAuth();
  const {
    eventRequestsPending,
    setEventRequestsPending,
    eventRequestsReviwed,
    setEventRequestsReviwed,
  } = useEvent();

  const { throwInfo, throwError } = useMessage();

  const [page, setPage] = useState(2);
  const [showLoader, setShowLoader] = useState(false);

  const handleConfirm = async (data: IEventResponse) => {
    try {
      await participationService.responseByEvent(data);

      const participation = eventRequestsPending.find(
        pending => pending.id_participation === data.participation_id,
      );

      if (participation) {
        setEventRequestsPending(
          eventRequestsPending.filter(
            pending => pending.id_participation !== data.participation_id,
          ),
        );

        participation.confirmed_by_event = data.confirm;
        participation.reviwer = user;
        participation.in =
          participation.confirmed_by_event && participation.confirmed_by_user;
        if (participation.in) participation.participation_status = 'user_in';

        setEventRequestsReviwed([participation, ...eventRequestsReviwed]);
        throwInfo(
          `Solicitação ${data.confirm ? 'aceita' : 'recusada'} com sucesso`,
        );
      }
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

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

      setEventRequestsPending(participations);
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

      setEventRequestsPending(prev => [...prev, ...participations]);
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
          onPress={handleConfirm}
        />
      );
    },
    [eventRequestsPending],
  );

  const keyExtractor = useCallback(
    (item: IParticipation) => `${item.id_participation}`,
    [],
  );

  const itemSeparatorComponent = useCallback(() => {
    return <View style={{ height: 14 }} />;
  }, [eventRequestsPending]);

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
          data={eventRequestsPending}
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
