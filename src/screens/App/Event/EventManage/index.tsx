import { AppView, View } from '@components/View';
import { EventProps } from '@routes/Event/event.routes';
import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@components/Button';
import styles from './styles';

const EventManage: React.FC<EventProps> = ({ navigation }) => {
  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Button
            title="Editar Evento"
            onPress={() => navigation.push('UpdateEvent')}
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default EventManage;
