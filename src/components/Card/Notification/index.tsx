import { View } from '@components/View';
import { Text } from '@components/Text';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
// import { Picture } from '@components/Profile/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { INotification } from '@interfaces/notification';
import { friendshipService } from '@services/Friendship';
import { IUser } from '@interfaces/user';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  notification: INotification;
};

const CardNotification = ({ notification, navigation }: CardProps) => {
  const { author, message } = notification;

  const [responseError, setResponseError] = useState('');
  const [status, setStatus] = useState<IUser['friendship_status']>('');
  // const [status, setStatus] = useState(author.friendship_status);

  const toAdd = !status || status === 'request_received';
  const handleFriendship = async () => {
    let currentStatus: IUser['friendship_status'];
    try {
      if (!status) {
        await friendshipService.createRequest(author.id_user);
        currentStatus = 'request_sent';
      }
      if (status === 'request_received') {
        await friendshipService.createResponse(author.id_user);
        currentStatus = 'friends';
      }
      if (status === 'request_received' || status === 'friends') {
        await friendshipService.deleteFriendship(author.id_user);
        currentStatus = '';
      }
      setStatus(currentStatus);
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  return (
    <>
      {notification && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.push('Profile', { user: author })}
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
