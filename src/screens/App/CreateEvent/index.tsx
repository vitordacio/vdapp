import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView } from 'react-native';

import { IEventType } from '@interfaces/types';
import { eventService } from '@services/Event';
import CardEventType from '@components/Card/Event/Type';
import styles from './styles';

const CreateEvent: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
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
      // eslint-disable-next-line no-console
      console.log(error.response.data.message);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <CardEventType navigation={navigation} eventType={item} index={index} />
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
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Tipo</Text>
            <Text style={[styles.text, styles.description]}>
              Selecione a categoria do evento
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
