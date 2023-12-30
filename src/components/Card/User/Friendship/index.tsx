import { View } from '@components/View';
import { Text } from '@components/Text';
import React, { useState, useEffect } from 'react';
import { Button } from '@components/Button';
import { Picture } from '@components/Picture';
import { IUser } from '@interfaces/user';
import { friendshipService } from '@services/Friendship';
import useMessage from '@contexts/message';
import { Pressable } from '@components/Pressable';
import { AppProps } from '@routes/App/app.routes';
import {
  FriendshipStatus,
  userFriendshipHandler,
} from '@screens/App/Profile/handlers';
import { IFriendship } from '@interfaces/friendship';
import styles from '../styles';

const CardUserWithFriendship: React.FC<AppProps & { user: IUser }> = ({
  user,
  navigation,
  route,
}) => {
  const { user: self, onUpdateUser } = route.params;
  const { throwInfo, throwError } = useMessage();
  const [friendshipLoader, setFriendshipLoader] = useState<boolean>(false);
  const [friendshipStatus, setFriendshipStatus] = useState(
    {} as FriendshipStatus,
  );

  const handleFriendship = async () => {
    setFriendshipLoader(true);
    let updatedUser = self;
    let dataFriendship: IFriendship;
    let status = friendshipStatus;
    let message: string;

    try {
      if (!status.friendship_status) {
        dataFriendship = await friendshipService.createRequest(user.id_user);

        message = 'Solicitação enviada com sucesso';
      } else if (status.friendship_status === 'request_received') {
        dataFriendship = await friendshipService.createResponse(user.id_user);

        message = 'Amizade aceita com sucesso';
        updatedUser = dataFriendship.receiver;
      } else {
        await friendshipService.deleteFriendship(user.id_user);
        if (status.friendship_status === 'friends') {
          updatedUser.friends_count -= 1;
          message = 'Você desfez a amizade com sucesso';
        } else {
          message = 'Solicitação cancelada com sucesso';
        }
      }

      status = userFriendshipHandler({
        friendship_id: dataFriendship?.friendship_id || '',
        friendship_status: dataFriendship?.friendship_status || '',
      });
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (status !== friendshipStatus) setFriendshipStatus(status);
    if (updatedUser !== self) onUpdateUser(updatedUser);
    if (message) throwInfo(message);
    setFriendshipLoader(false);
  };

  const handleOnPress = () => {
    if (self.id_user === user.id_user) return navigation.navigate('User');

    route.params.user_profile = user;
    return navigation.push('Profile');
  };

  useEffect(() => {
    const handleFriendshipStatus = userFriendshipHandler({
      friendship_id: user.friendship_id,
      friendship_status: user.friendship_status,
    });

    setFriendshipStatus(handleFriendshipStatus);
  }, []);

  return (
    <>
      {user && (
        <Pressable style={styles.container} onPress={handleOnPress}>
          <Picture card={true} picture={user.picture} />
          <View style={styles.content}>
            {user.name && <Text style={styles.name}>{user.name}</Text>}
            {user.username && (
              <Text style={styles.username}>@{user.username}</Text>
            )}
          </View>
          {self.id_user !== user.id_user && (
            <Button
              type={friendshipStatus.type}
              icon={friendshipStatus.icon}
              iconSize={30}
              style={styles.friendship}
              onPress={handleFriendship}
              loading={friendshipLoader}
            />
          )}
        </Pressable>
      )}
    </>
  );
};

export default CardUserWithFriendship;
