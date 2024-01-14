import React, { useState } from 'react';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { eventService } from '@services/Event';
import useMessage from '@contexts/message';
import styles from '../../styles';

const EventDeletePerformer: React.FC<AppProps> = ({ navigation, route }) => {
  const { updateEventPerformer, event } = route.params;
  const { throwInfo, throwError } = useMessage();
  const [loading, setLoading] = useState(false);

  const performer = updateEventPerformer.delete_data;
  const name = performer.user ? performer.user.name : performer.name;

  const handleDeletePerformer = async () => {
    setLoading(true);
    let message: string;
    const updatedEvent = { ...event };

    try {
      await eventService.deletePerformer(performer.id_performer);

      updatedEvent.performers = updatedEvent.performers.filter(
        eventPerformer =>
          eventPerformer.id_performer !== performer.id_performer,
      );

      message = 'Artista excluído com sucesso!';
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (event !== updatedEvent) {
      route.params.event = updatedEvent;
      throwInfo(message);
    }

    route.params.updateEventPerformer = null;
    return navigation.goBack();
  };

  return (
    <ViewUpdate
      name="Excluir Artista"
      description={`Tem certeza que deseja excluir o artista ${name}?`}
    >
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleDeletePerformer}
          title="Excluir"
          type="red"
          loading={loading}
        />
      </View>
    </ViewUpdate>
  );
};

export default EventDeletePerformer;
