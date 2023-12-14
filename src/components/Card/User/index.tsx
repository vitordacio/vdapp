import { View } from '@components/View';
import { Text } from '@components/Text';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
import { Picture } from '@components/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IUser } from '@interfaces/user';
import { friendshipService } from '@services/Friendship';
import useAuth from '@contexts/auth';
import useMessage from '@contexts/message';
import styles from './styles';

type Situation = {
  status: 'friends' | 'request_sent' | 'request_received' | '';
  type: 'blue' | 'red' | 'green' | 'gray';
  icon: 'user-plus' | 'user-check' | 'user-x' | 'user-minus';
};

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  user: IUser;
};

const CardUser = ({ user, navigation }: CardProps) => {
  const { user: self } = useAuth();
  const { throwError } = useMessage();
  const { username, name, picture, friendship_status } = user;

  const [situation, setSituation] = useState({} as Situation);

  const handleFriendship = async () => {
    try {
      if (!situation.status) {
        await friendshipService.createRequest(user.id_user);
        setSituation({
          status: 'request_sent',
          type: 'red',
          icon: 'user-x',
        });
      }
      if (situation.status === 'request_received') {
        await friendshipService.createResponse(user.id_user);
        setSituation({
          status: 'friends',
          type: 'red',
          icon: 'user-minus',
        });
      }
      if (
        situation.status === 'request_sent' ||
        situation.status === 'friends'
      ) {
        await friendshipService.deleteFriendship(user.id_user);
        setSituation({
          status: '',
          type: 'blue',
          icon: 'user-plus',
        });
      }
    } catch (error) {
      throwError(error.response.data.message);
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
    } else if (friendship_status === 'request_sent') {
      type = 'gray';
      icon = 'user-x';
    } else {
      type = 'red';
      icon = 'user-minus';
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
            self.id_user !== user.id_user
              ? navigation.push('Profile', { user })
              : navigation.navigate('User')
          }
        >
          <Picture card={true} picture={picture} />
          <View style={styles.content}>
            {name && <Text style={styles.name}>{name}</Text>}
            {username && <Text style={styles.username}>@{username}</Text>}
          </View>
          {self.id_user !== user.id_user && (
            <Button
              type={situation.type}
              icon={situation.icon}
              iconSize={30}
              iconColor="#FFFFFF"
              style={styles.friendship}
              onPress={handleFriendship}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardUser;
