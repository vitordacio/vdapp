import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';
import { IEvent } from '@interfaces/event';
import { Button } from '@components/Button';
import styles from './styles';

type EventProps = NativeStackScreenProps<ParamListBase> & {
  paramEvent: IEvent;
};

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
