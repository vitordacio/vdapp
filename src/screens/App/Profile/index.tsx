import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import React, { useEffect, useState } from 'react';
import { Counts } from '@components/Counts';
import { LineY } from '@components/Line';
import { ScrollView } from 'react-native';
import { Icon } from '@components/Icon';
import { UserPrivateTopTabRoutes } from '@routes/user.routes';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import useMessage from '@contexts/message';
// import useAuth from '@contexts/auth';
import { IFriendship } from '@interfaces/friendship';
import { friendshipService } from '@services/Friendship';
import { Pressable } from '@components/Pressable';
import { LoadingView } from '@components/View/Loading';
import { AppProps } from '@routes/App/app.routes';
import NotFoundProfile from './NotFoundProfile';
import { FriendshipStatus, userFriendshipHandler } from './handlers';
import styles from './styles';

const Profile: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwInfo, throwError } = useMessage();
  const { user, onUpdateUser, user_profile, onUpdateProfile } = route.params;

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [user_profileExists, setProfileExists] = useState<boolean>(true);
  const [friendshipLoader, setFriendshipLoader] = useState<boolean>(false);
  const [friendshipStatus, setFriendshipStatus] = useState(
    {} as FriendshipStatus,
  );

  const handleFriends = () => {
    route.params.user_friends = user;
    navigation.push('Friends');
  };

  const handleReactsReceived = () => {
    route.params.user_reacts_received = user;
    navigation.push('ReactsReceived');
  };

  const handleCreateReact = () => {
    route.params.react = {
      type: 'user',
      user: user_profile,
    };
    navigation.navigate('React');
  };

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
      let updatedUser = user;
      let updatedProfile = user_profile;
      let dataFriendship: IFriendship;
      let message = '';

      let status = friendshipStatus;

      if (!status.friendship_status) {
        dataFriendship = await friendshipService.createRequest(
          user_profile.id_user,
        );

        message = 'Solicitação enviada com sucesso';
      } else if (status.friendship_status === 'request_received') {
        dataFriendship = await friendshipService.createResponse(
          user_profile.id_user,
        );

        message = 'Amizade aceita com sucesso';

        updatedUser = dataFriendship.receiver;
        updatedProfile = dataFriendship.author;
      } else {
        await friendshipService.deleteFriendship(user_profile.id_user);
        if (status.friendship_status === 'friends') {
          updatedUser.friends_count -= 1;
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
        : user_profile.role_name !== 'user' || !user_profile.private;

      status = userFriendshipHandler(status);
      setFriendshipStatus(status);

      if (updatedUser !== user) onUpdateUser(updatedUser);
      if (updatedProfile !== user_profile) onUpdateProfile(updatedProfile);
      throwInfo(message);

      setFriendshipLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData(user_profile.id_user);
  }, []);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {user_profileExists ? (
          <>
            {showLoader ? (
              <LoadingView />
            ) : (
              <>
                {user_profile && (
                  <View style={styles.container}>
                    <CoverPhoto cover_photo={user_profile.cover_photo} />
                    <Picture picture={user_profile.picture} />
                    <Text style={styles.username}>
                      @{user_profile.username}
                    </Text>
                    <View style={styles.counts}>
                      <Counts
                        number={user_profile.friends_count}
                        description="Amigos"
                        onPress={
                          user_profile.control.can_see_content
                            ? () => handleFriends()
                            : () => throwInfo('Esse conteúdo é privado')
                        }
                      />
                      <LineY />
                      <Counts
                        number={user_profile.reacts_count}
                        description="Reações"
                        onPress={
                          user_profile.control.can_see_content
                            ? () => handleReactsReceived()
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
                        onPress={handleCreateReact}
                        icon="smile"
                      />
                      <Button
                        style={{ width: 40 }}
                        onPress={() => navigation.navigate('Inbox')}
                        icon="inbox"
                      />
                    </View>
                    {user_profile.location && (
                      <View style={styles.location}>
                        <Icon
                          name="location"
                          style={{ height: 19, width: 11.83 }}
                        />
                        <Text style={styles.text}>{user_profile.location}</Text>
                      </View>
                    )}
                    {user_profile.bio && (
                      <Text style={styles.text}>{user_profile.bio}</Text>
                    )}
                    <View style={styles.private}>
                      <Pressable
                        onPress={() =>
                          throwInfo(
                            `Esse perfil é ${
                              user_profile.private ? 'privado' : 'público'
                            }.`,
                          )
                        }
                      >
                        <Icon
                          name={user_profile.private ? 'lock' : 'unlock'}
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
