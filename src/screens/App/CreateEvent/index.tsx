import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { IEventType } from '@interfaces/types';
import { eventService } from '@services/Event';
import CardEventType from '@components/Card/Event/Type';
import useMessage from '@contexts/message';
import { Loading } from '@components/View/Loading';
import { AppProps } from '@routes/App/app.routes';
import { ICreateEvent } from '@services/Event/IEventService';
import styles from './styles';

export type CreateEventProps = {
  eventType: IEventType;
  form?: ICreateEvent;
};

const CreateEvent: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwError } = useMessage();
  const [data, setData] = useState<IEventType[] | []>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const fetchData = async () => {
    setShowLoader(true);

    let eventType: IEventType[];

    try {
      eventType = await eventService.findEventTypes();

      setData(eventType);
      setShowLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <CardEventType
          route={route}
          navigation={navigation}
          eventType={item}
          index={index}
        />
      );
    },
    [data],
  );

  const keyExtractor = useCallback(
    (item: IEventType) => `${item.id_event_type}`,
    [],
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {showLoader ? (
          <Loading size={150} />
        ) : (
          <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Tipo</Text>
            <Text style={[styles.text, styles.description]}>
              Selecione a categoria do evento
            </Text>
            <Text style={[styles.text, styles.info]}>
              A categoria do evento é fixa e não poderá ser modificada após a
              criação do evento.
            </Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 14 }}
              horizontal={false}
              numColumns={2}
            />
          </View>
        )}
      </ScrollView>
    </AppView>
  );
};

export default CreateEvent;
