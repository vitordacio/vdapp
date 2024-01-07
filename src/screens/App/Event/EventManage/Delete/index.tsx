import { AppView, View } from '@components/View';
import React, { useState } from 'react';
import { AppProps } from '@routes/App/app.routes';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import useMessage from '@contexts/message';
import { eventService } from '@services/Event';
import styles from './styles';

const DeleteEvent: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;
  const { throwInfo, throwError } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await eventService.deleteEvent(event.id_event);

      throwInfo('Evento excluído com sucesso');
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  return (
    <AppView>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>Confirmar exclusão</Text>
          <Text style={styles.description}>
            Ao excluir um evento, as informações associadas serão
            permanentemente perdidas.
          </Text>
        </View>

        <View style={styles.button_wrapper}>
          <Button
            title="Excluir"
            type="red"
            onPress={handleDelete}
            loading={loading}
          />
        </View>
      </View>
    </AppView>
  );
};

export default DeleteEvent;
