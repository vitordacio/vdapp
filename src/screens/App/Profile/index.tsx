import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import { ProfileProps } from '@routes/Profile/profile.routes';
import React, { useEffect, useState } from 'react';
import { Counts } from '@components/Counts';
import { LineY } from '@components/Line';
import { ScrollView } from 'react-native';
import { Icon } from '@components/Icon';
import { UserPrivateTopTabRoutes } from '@routes/user.routes';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import useMessage from '@contexts/message';
import useAuth from '@contexts/auth';
import { IFriendship } from '@interfaces/friendship';
import { friendshipService } from '@services/Friendship';
import { Pressable } from '@components/Pressable';
import { LoadingView } from '@components/View/Loading';
import NotFoundProfile from './NotFoundProfile';
import { FriendshipStatus, userFriendshipHandler } from './handlers';
import styles from './styles';

const Profile: React.FC<ProfileProps> = ({
  navigation,
  route,
  onUpdateProfile,
}) => {
  const { user: self } = useAuth();
  const { throwInfo, throwError } = useMessage();
  const { user, onUpdateUser } = route.params;

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [profileExists, setProfileExists] = useState<boolean>(true);
  const [friendshipLoader, setFriendshipLoader] = useState<boolean>(false);
  const [friendshipStatus, setFriendshipStatus] = useState(
    {} as FriendshipStatus,
  );

  const fetchData = async (user_id: string) => {
    setShowLoader(true);

    let dataUser: IUser;

    try {
      dataUser = await userService.findById(user_id);

      const handleFriendshipStatus = userFriendshipHandler(dataUser.control);

      setFriendshipStatus(handleFriendshipStatus);
    } catch (error) {
      throwError(error.response.data.message);
      setProfileExists(false);
    }
    setShowLoader(false);
  };

  const handleFriendship = async () => {
    setFriendshipLoader(true);

    try {
      let updatedSelf = self;
      let updatedProfile = user;
      let dataFriendship: IFriendship;
      let message = '';

      let status = friendshipStatus;

      if (!status.friendship_status) {
        dataFriendship = await friendshipService.createRequest(user.id_user);

        message = 'Solicitação enviada com sucesso';
      } else if (status.friendship_status === 'request_received') {
        dataFriendship = await friendshipService.createResponse(user.id_user);

        message = 'Amizade aceita com sucesso';

        updatedSelf = dataFriendship.receiver;
        updatedProfile = dataFriendship.author;
      } else {
        await friendshipService.deleteFriendship(user.id_user);
        if (status.friendship_status === 'friends') {
          updatedSelf.friends_count -= 1;
          updatedProfile.friends_count -= 1;
          message = 'Você desfez a amizade com sucesso';
        } else {
          message = 'Solicitação cancelada com sucesso';
        }

        status.friendship_id = '';
      }

      status.friendship_status = dataFriendship
        ? dataFriendship.control.friendship_status
        : '';
      status.can_see_content = dataFriendship
        ? dataFriendship.control.can_see_content
        : user.role_name !== 'user' || !user.private;

      status = userFriendshipHandler(status);
      setFriendshipStatus(status);

      if (updatedSelf !== self) onUpdateUser({ ...self, ...updatedSelf });
      if (updatedProfile !== user)
        onUpdateProfile({ ...user, ...updatedProfile });
      throwInfo(message);

      setFriendshipLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData(user.id_user);
  }, []);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {profileExists ? (
          <>
            {showLoader ? (
              <LoadingView />
            ) : (
              <>
                {user && (
                  <View style={styles.container}>
                    <CoverPhoto cover_photo={user.cover_photo} />
                    <Picture picture={user.picture} />
                    <Text style={styles.username}>@{user.username}</Text>
                    <View style={styles.counts}>
                      <Counts
                        number={user.friends_count}
                        description="Amigos"
                        onPress={
                          user.control.can_see_content
                            ? () => navigation.push('Friends', { user })
                            : () => throwInfo('Esse conteúdo é privado')
                        }
                      />
                      <LineY />
                      <Counts
                        number={user.emojis_count}
                        description="Emotes"
                        onPress={
                          user.control.can_see_content
                            ? () => navigation.push('EmojisReceived', { user })
                            : () => throwInfo('Esse conteúdo é privado')
                        }
                      />
                    </View>
                    <View style={styles.buttons}>
                      <Button
                        type={friendshipStatus.type}
                        icon={friendshipStatus.icon}
                        style={{ maxWidth: 200 }}
                        iconSize={22}
                        iconColor="#FFFFFF"
                        onPress={handleFriendship}
                        title={friendshipStatus.buttonTitle}
                        loading={friendshipLoader}
                      />
                      <Button
                        style={{ width: 40 }}
                        onPress={() => navigation.navigate('Inbox')}
                        icon="inbox"
                      />
                    </View>
                    {user.location && (
                      <View style={styles.location}>
                        <Icon
                          name="location"
                          style={{ height: 19, width: 11.83 }}
                        />
                        <Text style={styles.text}>{user.location}</Text>
                      </View>
                    )}
                    {user.bio && <Text style={styles.text}>{user.bio}</Text>}
                    <View style={styles.private}>
                      <Pressable
                        onPress={() =>
                          throwInfo(
                            `Esse perfil é ${
                              user.private ? 'privado' : 'público'
                            }.`,
                          )
                        }
                      >
                        <Icon
                          name={user.private ? 'lock' : 'unlock'}
                          size={19}
                        />
                      </Pressable>
                    </View>
                  </View>
                )}
              </>
            )}
            <View style={{ minHeight: 800 }}>
              <UserPrivateTopTabRoutes />
              {/* {friendshipStatus.can_see_content ? (
                <UserTopTabRoutes />
              ) : (
                <UserPrivateTopTabRoutes />
              )} */}
            </View>
          </>
        ) : (
          <NotFoundProfile />
        )}
      </ScrollView>
    </AppView>
  );
};

export default Profile;
