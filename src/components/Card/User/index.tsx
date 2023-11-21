import { View } from '@components/View';
import { Text } from '@components/Text';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
import { Picture } from '@components/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IUser } from '@interfaces/user';
import { CreateRequest } from '@services/Friendship/CreateRequest';
import { CreateResponse } from '@services/Friendship/CreateResponse';
import { DeleteFriendship } from '@services/Friendship/DeleteFriendship';
import styles from './styles';

type Situation = {
  status: 'friends' | 'request_sent' | 'request_received' | '';
  type: 'blue' | 'red' | 'green';
  icon: 'user-plus' | 'user-check' | 'user-x';
};

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  user: IUser;
};

const CardUser = ({ user, navigation }: CardProps) => {
  const { username, name, picture, friendship_status } = user;

  const [responseError, setResponseError] = useState('');
  const [situation, setSituation] = useState({} as Situation);

  const handleFriendship = async () => {
    try {
      if (!situation.status) {
        await CreateRequest(user.id_user);
        setSituation({
          status: 'request_sent',
          type: 'red',
          icon: 'user-x',
        });
      }
      if (situation.status === 'request_received') {
        await CreateResponse(user.id_user);
        setSituation({
          status: 'friends',
          type: 'red',
          icon: 'user-x',
        });
      }
      if (
        situation.status === 'request_sent' ||
        situation.status === 'friends'
      ) {
        await DeleteFriendship(user.id_user);
        setSituation({
          status: '',
          type: 'blue',
          icon: 'user-plus',
        });
      }
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  useEffect(() => {
    let type: Situation['type'];
    let icon: Situation['icon'];

    if (!friendship_status) {
      type = 'blue';
      icon = 'user-plus';
    } else if (friendship_status === 'request_received') {
      type = 'green';
      icon = 'user-check';
    } else {
      type = 'red';
      icon = 'user-x';
    }

    const handleSituation: Situation = {
      status: friendship_status,
      type,
      icon,
    };

    setSituation(handleSituation);
  }, []);

  return (
    <>
      {user && (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            navigation.push('Profile', { profile_id: user.id_user })
          }
        >
          <Picture card={true} picture={picture} />
          <View style={styles.data}>
            {name && <Text style={styles.name}>{name}</Text>}
            {username && <Text style={styles.username}>@{username}</Text>}
          </View>
          <Button
            type={situation.type}
            icon={situation.icon}
            iconSize={30}
            iconColor="#FFFFFF"
            style={styles.friendship}
            onPress={handleFriendship}
          />
          <Text style={styles.error}>{responseError}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardUser;
