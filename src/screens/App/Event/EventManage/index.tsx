import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@components/Button';
import styles from './styles';

const EventManage: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
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
