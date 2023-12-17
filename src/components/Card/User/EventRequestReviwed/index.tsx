import { View } from '@components/View';
import { Text } from '@components/Text';
import React, { useEffect, useState } from 'react';
import { Picture } from '@components/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import useAuth from '@contexts/auth';
import { Pressable } from '@components/Pressable';
import { IParticipation } from '@interfaces/participation';
import { Icon } from '@components/Icon';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  participation: IParticipation;
};

const CardUserEventRequestRevivew: React.FC<CardProps> = ({
  participation,
  navigation,
}) => {
  const { user: self } = useAuth();

  const [info, setInfo] = useState<string>();
  const { username, name, picture } = participation.user;

  useEffect(() => {
    let text: string;

    const { participation_status, reviwer } = participation;

    if (!participation_status) return;
    if (participation_status === 'user_in')
      text = `Participação revisada por @${reviwer.username}`;
    if (['guest_in', 'guest_out'].includes(participation_status))
      text = `Convidado revisado por @${reviwer.username}`;
    if (['vip_in', 'vip_out'].includes(participation_status))
      text = `Convidado VIP revisado por @${reviwer.username}`;
    if (['mod_in', 'mod_out'].includes(participation_status))
      text = `Moderador revisado por @${reviwer.username}`;

    setInfo(text);
  }, []);

  return (
    <>
      {participation && (
        <Pressable
          style={[
            styles.container,
            participation.confirmed_by_event
              ? styles.green_border
              : styles.red_border,
          ]}
          onPress={() =>
            self.id_user !== participation.user.id_user
              ? navigation.push('Profile', { user: participation.user })
              : navigation.navigate('User')
          }
        >
          <View style={styles.container_info}>
            <Text style={styles.info}>{info || ''}</Text>
            <Icon
              name={participation.confirmed_by_event ? 'check' : 'x'}
              tintColor={participation.confirmed_by_event ? 'green' : 'red'}
            />
          </View>
          <View style={styles.user}>
            <Picture card={true} picture={picture} />
            <View style={styles.content}>
              {name && <Text style={styles.name}>{name}</Text>}
              {username && <Text style={styles.username}>@{username}</Text>}
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardUserEventRequestRevivew;
