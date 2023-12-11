import React, { useState } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { ActivityIndicator, Switch } from 'react-native';
import useEvent from '@contexts/event';
import useMessage from '@contexts/message';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import { ViewUpdate } from '../ViewUpdate';
import styles from './styles';

const UpdateEventPrivacy: React.FC<
  NativeStackScreenProps<ParamListBase>
> = () => {
  const { event, setEvent } = useEvent();
  const { setMessage, setMessageType, handleEntering } = useMessage();

  const [value, setValue] = useState(event.private);
  const [loading, setLoading] = useState(false);

  const handlePrivate = async () => {
    setLoading(true);
    let updatedEvent: IEvent;
    let message: string;
    let msgType = 'info';

    try {
      updatedEvent = await eventService.updatePrivacy({
        event_id: event.id_event,
        private: !value,
      });
    } catch (error) {
      msgType = 'alert';
      message = error.response.data.message;
    }

    if (msgType !== 'alert') setEvent(updatedEvent);

    setMessageType(msgType);
    setMessage(message);
    handleEntering();
    setValue(prev => !prev);
    setLoading(false);
  };

  return (
    <ViewUpdate
      name="Privacidade do evento"
      description="Quem pode ver o conteúdo"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Evento Privado</Text>
        <View style={styles.switch}>
          {!loading ? (
            <Switch onValueChange={handlePrivate} value={value} />
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
      </View>
      <Text style={styles.event_private}>
        {value ? 'O evento está privado' : 'O evento está público'}
      </Text>

      <Text style={[styles.details, { marginBottom: 14 }]}>
        Eventos públicos são visíveis para todos os usuários, incentivando uma
        participação aberta e aumentando a visibilidade do seu evento.
      </Text>
      <Text style={styles.details}>
        Eventos privados são exclusivos, permanecendo fora do feed público e não
        estando sujeitos a solicitações. Embora permaneçam visíveis, todo o
        conteúdo é reservado apenas para os participantes.
      </Text>
    </ViewUpdate>
  );
};

export default UpdateEventPrivacy;
