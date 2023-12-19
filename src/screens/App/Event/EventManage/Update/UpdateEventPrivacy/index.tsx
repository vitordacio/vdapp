import React, { useState } from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Switch } from 'react-native';
import useMessage from '@contexts/message';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import { Loading } from '@components/View/Loading';
import { EventProps } from '@routes/Event/event.routes';
import { ViewUpdate } from '../ViewUpdate';
import styles from './styles';

const UpdateEventPrivacy: React.FC<EventProps> = ({ route, onUpdateEvent }) => {
  const { event } = route.params;
  const { throwInfo, throwError } = useMessage();

  const [value, setValue] = useState(event.private);
  const [loading, setLoading] = useState(false);

  const handlePrivate = async () => {
    setLoading(true);
    let updatedEvent: IEvent;

    try {
      updatedEvent = await eventService.updatePrivacy({
        event_id: event.id_event,
        is_private: !value,
      });
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (updatedEvent) {
      updatedEvent.status = event.status;
      updatedEvent.participation_status = event.participation_status;
      onUpdateEvent(updatedEvent);
      throwInfo('Privacidade do evento atualizada com sucesso!');
    }

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
            <Loading />
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
