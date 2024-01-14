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
import styles from './styles';

const CardUser: React.FC<AppProps & { user: IUser }> = ({
  user,
  navigation,
  route,
}) => {
  const { user: self } = route.params;
  const { throwInfo, throwError } = useMessage();
  const [friendshipLoader, setFriendshipLoader] = useState<boolean>(false);
  const [friendshipStatus, setFriendshipStatus] = useState(
    {} as FriendshipStatus,
  );

  const handleFriendship = async () => {
    setFriendshipLoader(true);

    try {
      let updatedUser = self;
      // let updatedProfile = user;
      let dataFriendship: IFriendship;
      let message = '';

      let status = friendshipStatus;

      if (!status.friendship_status) {
        dataFriendship = await friendshipService.createRequest(user.id_user);

        message = 'Solicitação enviada com sucesso';
      } else if (status.friendship_status === 'request_received') {
        dataFriendship = await friendshipService.createResponse(user.id_user);

        message = 'Amizade aceita com sucesso';

        updatedUser = dataFriendship.receiver;
        // updatedProfile = dataFriendship.author;
      } else {
        await friendshipService.deleteFriendship(user.id_user);
        if (status.friendship_status === 'friends') {
          updatedUser.friends_count -= 1;
          // updatedProfile.friends_count -= 1;
          message = 'Você desfez a amizade com sucesso';
        } else {
          message = 'Solicitação cancelada com sucesso';
        }

        status.friendship_id = '';
      }

      status.friendship_status = dataFriendship
        ? dataFriendship.friendship_status
        : '';

      status = userFriendshipHandler(status);
      setFriendshipStatus(status);

      if (updatedUser !== self) {
        route.params.user = { ...self, ...updatedUser };
      }
      // if (updatedProfile !== user) user = { ...user, ...updatedProfile };
      throwInfo(message);

      setFriendshipLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
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
              iconColor="#FFFFFF"
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

export default CardUser;
