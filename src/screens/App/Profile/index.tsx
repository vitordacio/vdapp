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
import { UserPrivateTopTabRoutes } from '@routes/Private/UserPrivateTopTabRoutes';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import useMessage from '@contexts/message';
import { IFriendship } from '@interfaces/friendship';
import { friendshipService } from '@services/Friendship';
import { Pressable } from '@components/Pressable';
import { LoadingView } from '@components/View/Loading';
import { ProfileTopTabRoutes } from '@routes/App/Profile/ProfileTopTab';
import { AppProps } from '@routes/App/app.routes';
import NotFoundProfile from './NotFoundProfile';
import { FriendshipStatus, userFriendshipHandler } from './handlers';
import styles from './styles';

const Profile: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwInfo, throwError } = useMessage();
  const { user: self, onUpdateUser, user_profile } = route.params;

  const [user, setUser] = useState<IUser>();
  const [showLoader, setShowLoader] = useState<boolean>(false);
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

  const handleReact = () => {
    if (user.user_react) {
      route.params.react = {
        type: 'user',
        react: user.user_react,
        user,
      };
      navigation.navigate('ReactUserView');
    } else {
      route.params.react = {
        type: 'user',
        user,
      };
      navigation.navigate('React');
    }
  };

  const fetchData = async (user_id: string) => {
    setShowLoader(true);

    let dataProfile: IUser;

    try {
      dataProfile = await userService.findById(user_id);

      setUser(dataProfile);

      const handleFriendshipStatus = userFriendshipHandler({
        friendship_id: dataProfile.friendship_id,
        friendship_status: dataProfile.friendship_status,
      });

      setFriendshipStatus(handleFriendshipStatus);
    } catch (error) {
      throwError(error.response.data.message);
    }
    setShowLoader(false);
  };

  const handleFriendship = async () => {
    setFriendshipLoader(true);
    let updatedUser = self;
    let updatedProfile = user;
    let dataFriendship: IFriendship;
    let status = friendshipStatus;
    let message: string;

    try {
      if (!status.friendship_status) {
        dataFriendship = await friendshipService.createRequest(
          user_profile.id_user,
        );

        message = 'Solicitação enviada com sucesso';
        updatedProfile.can_see_content = dataFriendship.can_see_content;
      } else if (status.friendship_status === 'request_received') {
        dataFriendship = await friendshipService.createResponse(
          user_profile.id_user,
        );

        message = 'Amizade aceita com sucesso';

        updatedUser = dataFriendship.receiver;
        updatedProfile = dataFriendship.author;
        updatedProfile.can_see_content = dataFriendship.can_see_content;
      } else {
        await friendshipService.deleteFriendship(user_profile.id_user);
        if (status.friendship_status === 'friends') {
          updatedUser.friends_count -= 1;
          updatedProfile.friends_count -= 1;
          message = 'Você desfez a amizade com sucesso';
          if (updatedProfile.private) updatedProfile.can_see_content = false;
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
    if (updatedProfile !== user) setUser(updatedProfile);
    if (message) throwInfo(message);
    setFriendshipLoader(false);
  };

  useEffect(() => {
    fetchData(user_profile.id_user);
  }, [route.params.user_profile]);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {!showLoader ? (
          <>
            {user && !user.blocked ? (
              <View style={styles.container}>
                <CoverPhoto cover_photo={user.cover_photo} />
                <Picture picture={user.picture} />
                <Text style={styles.username}>@{user.username}</Text>
                <View style={styles.counts}>
                  <Counts
                    number={user.friends_count}
                    description="Amigos"
                    onPress={
                      user.can_see_content
                        ? () => handleFriends()
                        : () => throwInfo('Esse conteúdo é privado')
                    }
                  />
                  <LineY />
                  <Counts
                    number={user.reacts_count}
                    description="Reações"
                    onPress={
                      user.can_see_content
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
                    onPress={handleReact}
                    title={user.user_react?.emoji.value}
                    icon={!user.user_react && 'smile'}
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
                    <Icon name={user.private ? 'lock' : 'unlock'} size={19} />
                  </Pressable>
                </View>
              </View>
            ) : (
              <NotFoundProfile />
            )}
            <View style={{ minHeight: 800 }}>
              {!showLoader ? (
                <>
                  {user && user.can_see_content ? (
                    <ProfileTopTabRoutes
                      navigation={navigation}
                      route={route}
                    />
                  ) : (
                    <UserPrivateTopTabRoutes />
                  )}
                </>
              ) : (
                <UserPrivateTopTabRoutes />
              )}
            </View>
            {/* <View style={{ minHeight: 800 }}>
              {user.can_see_content ? (
                <ProfileTopTabRoutes navigation={navigation} route={route} />
              ) : (
                <UserPrivateTopTabRoutes />
              )}
            </View> */}
          </>
        ) : (
          <LoadingView />
        )}
      </ScrollView>
    </AppView>
  );
};

export default Profile;
