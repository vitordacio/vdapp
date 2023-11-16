import { View } from '@components/View';
import { Text } from '@components/Text';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
import { Picture } from '@components/Profile/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IUser } from '@interfaces/user';
import { CreateRequest } from '@services/Friendship/CreateRequest';
import { CreateResponse } from '@services/Friendship/CreateResponse';
import { DeleteFriendship } from '@services/Friendship/DeleteFriendship';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  user: IUser;
};

const CardUser = ({ user, navigation }: CardProps) => {
  const { username, name, picture, friendship_status } = user;

  const [responseError, setResponseError] = useState('');
  const [status, setStatus] = useState(friendship_status);

  const toAdd = !status || status === 'request_received';
  // const handleUser = async () => {};
  const handleFriendship = async () => {
    try {
      if (!status) {
        await CreateRequest(user.id_user);
        setStatus('request_sent');
      }
      if (status === 'request_received') {
        await CreateResponse(user.id_user);
        setStatus('friends');
      }
      if (status === 'request_received' || status === 'friends') {
        await DeleteFriendship(user.id_user);
        setStatus('');
      }
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  return (
    <>
      {user && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.push('Profile', { user })}
        >
          <Picture card={true} picture={picture} />
          <View style={styles.data}>
            {name && <Text style={styles.name}>{name}</Text>}
            {username && <Text style={styles.username}>@{username}</Text>}
          </View>
          <Button
            type={toAdd ? 'blue' : 'red'}
            icon={toAdd ? 'user-plus' : 'user-x'}
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
