import { AppView, View } from '@components/View';
import React from 'react';
import { EventProps } from '@routes/Event/event.routes';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import styles from './styles';

const DeleteEvent: React.FC<EventProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleDelete = () => {
    return navigation.navigate('User');
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

        <Button title="Excluir" type="red" onPress={handleDelete} />
      </View>
    </AppView>
  );
};

export default DeleteEvent;
