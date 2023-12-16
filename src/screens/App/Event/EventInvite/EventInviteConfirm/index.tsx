import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import React, { useState } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IUser } from '@interfaces/user';
import CardUserInfo from '@components/Card/User/Info';
import { Button } from '@components/Button';
import { LineX } from '@components/Line';
import styles from './styles';

type EventInviteConfirmProps = NativeStackScreenProps<ParamListBase> & {
  route: {
    params: {
      user: IUser;
    };
  };
};

const EventInviteConfirm: React.FC<EventInviteConfirmProps> = ({ route }) => {
  const [inviteType, setInviteType] = useState('guest');
  const { user } = route.params;

  const handleConfirmInvite = () => {};

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tipo de convite</Text>
        <Text style={styles.description}>
          Escolha como será a participação do usuário no evento
        </Text>
        <View style={styles.user}>
          <CardUserInfo user={user} />
        </View>
        <View style={styles.options}>
          <Button
            type="dark_gold"
            style={{ maxWidth: 200 }}
            onPress={() => setInviteType('guest')}
            title="Convidado"
          />
          <Button
            type="dark_gold"
            style={{ maxWidth: 200 }}
            onPress={() => setInviteType('mod')}
            title="Moderador"
          />
          <Button
            type="dark_gold"
            style={{ maxWidth: 200 }}
            onPress={() => setInviteType('vip')}
            title="VIP"
          />
        </View>
        <Text style={[styles.description, { textAlign: 'center' }]}>
          Pressione o botão abaixo para confirmar a presença{' '}
          <Text style={styles.color_blue}>{user.name}</Text> como{' '}
          <Text style={styles.color_blue}>{inviteType}</Text>
        </Text>
        <View style={styles.container_button}>
          <Button onPress={handleConfirmInvite} title="Confirmar" />
        </View>
        <LineX />
      </ScrollView>
    </AppView>
  );
};

export default EventInviteConfirm;
