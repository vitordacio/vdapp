import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { Button } from '@components/Button';
import { Picture } from '@components/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import useAuth from '@contexts/auth';
import useMessage from '@contexts/message';
import { Pressable } from '@components/Pressable';
import { IParticipation } from '@interfaces/participation';
import { participationService } from '@services/Participation';
import useEvent from '@contexts/event';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  participation: IParticipation;
};

const CardUserEventRequestPending: React.FC<CardProps> = ({
  participation,
  navigation,
}) => {
  const { user: self } = useAuth();
  const {
    eventRequestsPending,
    setEventRequestsPending,
    eventRequestsReviwed,
    setEventRequestsReviwed,
  } = useEvent();
  const { throwInfo, throwError } = useMessage();
  const { username, name, picture } = participation.user;

  const handleConfirm = async (confirm: boolean) => {
    try {
      await participationService.responseByEvent({
        participation_id: participation.id_participation,
        confirm,
      });

      setEventRequestsPending(
        eventRequestsPending.filter(
          pending =>
            pending.id_participation !== participation.id_participation,
        ),
      );

      participation.participation_status = 'user_in';
      setEventRequestsReviwed([participation, ...eventRequestsReviwed]);
      throwInfo(`Solicitação ${confirm ? 'aceita' : 'recusada'} com sucesso`);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  return (
    <>
      {participation && (
        <Pressable
          style={styles.container}
          onPress={() =>
            self.id_user !== participation.user.id_user
              ? navigation.push('Profile', { user: participation.user })
              : navigation.navigate('User')
          }
        >
          <Picture card={true} picture={picture} />
          <View style={styles.content}>
            {name && <Text style={styles.name}>{name}</Text>}
            {username && <Text style={styles.username}>@{username}</Text>}
          </View>
          <View style={styles.participation}>
            <Button
              type="green"
              icon="check"
              iconSize={30}
              iconColor="#FFFFFF"
              onPress={() => handleConfirm(true)}
              style={styles.participation_button}
            />
            <Button
              type="red"
              icon="x"
              iconSize={30}
              iconColor="#FFFFFF"
              onPress={() => handleConfirm(false)}
              style={styles.participation_button}
            />
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardUserEventRequestPending;
