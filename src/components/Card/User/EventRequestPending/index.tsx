import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { Button } from '@components/Button';
import { Picture } from '@components/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import useAuth from '@contexts/auth';
import { Pressable } from '@components/Pressable';
import { IParticipation } from '@interfaces/participation';
import { IEventResponse } from '@services/Participation/IParticipationService';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  participation: IParticipation;
  onPress: (data: IEventResponse) => void;
};

const CardUserEventRequestPending: React.FC<CardProps> = ({
  participation,
  navigation,
  onPress,
}) => {
  const { user: self } = useAuth();

  const { username, name, picture } = participation.user;

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
              onPress={() =>
                onPress({
                  participation_id: participation.id_participation,
                  confirm: true,
                })
              }
              style={styles.participation_button}
            />
            <Button
              type="red"
              icon="x"
              iconSize={30}
              iconColor="#FFFFFF"
              onPress={() =>
                onPress({
                  participation_id: participation.id_participation,
                  confirm: false,
                })
              }
              style={styles.participation_button}
            />
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardUserEventRequestPending;
