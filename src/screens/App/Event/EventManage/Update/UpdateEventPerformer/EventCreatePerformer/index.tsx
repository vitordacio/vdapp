import React, { useState } from 'react';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import useMessage from '@contexts/message';
import { IUser } from '@interfaces/user';
import { ICreatePerformer } from '@services/Event/IEventService';
import styles from '../../styles';

const EventCreatePerformer: React.FC<AppProps> = ({ navigation, route }) => {
  const { updateEventPerformer, event } = route.params;
  const { throwInfo, throwError } = useMessage();
  const [loading, setLoading] = useState(false);

  const { type, data } = updateEventPerformer.create_data;
  const name = type === 'user' ? (data as IUser).name : data;

  const handleCreatePerformer = async () => {
    setLoading(true);
    let message: string;
    let updatedEvent: IEvent;
    const request = {
      event_id: event.id_event,
    } as ICreatePerformer;
    if (type === 'name') request.name = data as string;
    if (type === 'user') request.user_id = (data as IUser).id_user;

    try {
      updatedEvent = await eventService.createPerformer(request);

      message = 'Artista cadastrado com sucesso!';
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (updatedEvent) {
      route.params.event = updatedEvent;
      throwInfo(message);
    }

    route.params.updateEventPerformer = null;
    return navigation.navigate('UpdateEventPerformerScreen');
  };

  return (
    <ViewUpdate
      name="Cadastrar Artista"
      description={`Tem certeza que deseja adicionar o artista ${name}?`}
    >
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleCreatePerformer}
          title="Confirmar"
          type="blue"
          loading={loading}
        />
      </View>
    </ViewUpdate>
  );
};

export default EventCreatePerformer;
