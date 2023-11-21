import { View } from '@components/View';
import { Text } from '@components/Text';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
// import { Picture } from '@components/Profile/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { INotification } from '@interfaces/notification';
import { CreateRequest } from '@services/Friendship/CreateRequest';
import { CreateResponse } from '@services/Friendship/CreateResponse';
import { DeleteFriendship } from '@services/Friendship/DeleteFriendship';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  notification: INotification;
};

const CardNotification = ({ notification, navigation }: CardProps) => {
  const { author, message } = notification;

  const [responseError, setResponseError] = useState('');
  const [status, setStatus] = useState('');
  // const [status, setStatus] = useState(author.friendship_status);

  const toAdd = !status || status === 'request_received';

  const handleFriendship = async () => {
    try {
      if (!status) {
        await CreateRequest(author.id_user);
        setStatus('request_sent');
      }
      if (status === 'request_received') {
        await CreateResponse(author.id_user);
        setStatus('friends');
      }
      if (status === 'request_received' || status === 'friends') {
        await DeleteFriendship(author.id_user);
        setStatus('');
      }
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  return (
    <>
      {notification && (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            navigation.push('Profile', { profile_id: notification.author_id })
          }
        >
          {/* {author.picture && <Picture card={true} picture={author.picture} />} */}
          <View style={styles.data}>
            {message && <Text style={styles.message}>{message}</Text>}
            {/* {author.username && (
              <Text style={styles.username}>@{author.username}</Text>
            )} */}
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

export default CardNotification;
