/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import { ProfileProps } from '@routes/Profile/profile.routes';
import React, { useEffect, useState } from 'react';
import { Counts } from '@components/Counts';
import { LineY } from '@components/Line';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';
import { UserPrivateTopTabRoutes } from '@routes/user.routes';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import useMessage from '@contexts/message';
import styles from './styles';

// type Situation = {
//   status: 'friends' | 'request_sent' | 'request_received' | '';
//   type: 'blue' | 'red' | 'green' | 'gray';
//   icon: 'user-plus' | 'user-check' | 'user-x' | 'user-minus';
// };

export type FriendshipStatus = {
  friendship_id?: string;
  friendship_status: IUser['friendship_status'];
  userIn: boolean;
  type: 'blue' | 'red' | 'green' | 'gray';
  icon: 'user-plus' | 'user-check' | 'user-x' | 'user-minus';
  title: string;
  buttonTitle: string;
};

const Profile: React.FC<ProfileProps> = ({
  navigation,
  route,
  onUpdateProfile,
}) => {
  // const { user, setUser } = useAuth();
  const { throwInfo, throwError } = useMessage();
  // const route = useRoute();
  const { user } = route.params;

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

      // const handleFriendshipStatus = userFriendshipHandler({
      //   friendship_status: dataUser.friendship_status,
      //   friendship_id: dataUser.friendship_id,
      // });

      // setFriendshipStatus(handleFriendshipStatus);
    } catch (error) {
      throwError(error.response.data.message);
      setProfileExists(false);
    }
    setShowLoader(false);
  };

  const handleFriendship = () => {};

  // const [profileUser, setProfileUser] = useState<IUser>();
  // const [showLoader, setShowLoader] = useState<boolean>(false);
  // const [showPrivate, setShowPrivate] = useState<boolean>(false);
  // const [privateViewType, setPrivateViewType] = useState<'info' | 'warning'>();
  // const [friendshipLoader, setFriendshipLoader] = useState<boolean>(false);
  // const [friendshipTitle, setFriendshipTitle] = useState<string>('');
  // const [situation, setSituation] = useState({} as Situation);

  // const fetchData = async () => {
  //   setShowLoader(true);
  //   let currentTitle: string = '';
  //   let profile: IUser;

  //   let type: Situation['type'];
  //   let icon: Situation['icon'];

  //   try {
  //     profile = await userService.findById(paramUser.id_user);

  //     const { friendship_status } = profile;

  //     if (!friendship_status) {
  //       type = 'blue';
  //       icon = 'user-plus';
  //       currentTitle = 'Adicionar amigo';
  //     } else if (friendship_status === 'request_received') {
  //       type = 'green';
  //       icon = 'user-check';
  //       currentTitle = 'Aceitar amizade';
  //     } else if (friendship_status === 'request_sent') {
  //       type = 'gray';
  //       icon = 'user-x';
  //       currentTitle = 'Cancelar solicitação';
  //     } else {
  //       type = 'red';
  //       icon = 'user-minus';
  //       currentTitle = 'Desfazer amizade';
  //     }

  //     const handleSituation: Situation = {
  //       status: friendship_status,
  //       type,
  //       icon,
  //     };

  //     setSituation(handleSituation);
  //     setFriendshipTitle(currentTitle);
  //     setProfileUser(profile);
  //     setShowLoader(false);
  //   } catch (error) {
  //     throwError(error.response.data.message);
  //   }
  // };

  // const handleFriendship = async () => {
  //   setFriendshipLoader(true);
  //   let currentTitle: string = '';

  //   try {
  //     if (!situation.status) {
  //       await friendshipService.createRequest(profileUser.id_user);
  //       setSituation({
  //         status: 'request_sent',
  //         type: 'gray',
  //         icon: 'user-x',
  //       });
  //       currentTitle = 'Cancelar solicitação';
  //     } else if (situation.status === 'request_received') {
  //       await friendshipService.createResponse(profileUser.id_user);
  //       setSituation({
  //         status: 'friends',
  //         type: 'red',
  //         icon: 'user-minus',
  //       });
  //       user.friends_count += 1;
  //       profileUser.friends_count += 1;
  //       currentTitle = 'Desfazer amizade';
  //     } else {
  //       await friendshipService.deleteFriendship(profileUser.id_user);
  //       setSituation({
  //         status: '',
  //         type: 'blue',
  //         icon: 'user-plus',
  //       });
  //       if (situation.status === 'friends') {
  //         user.friends_count -= 1;
  //         profileUser.friends_count -= 1;
  //       }
  //       currentTitle = 'Adicionar amigo';
  //     }

  //     setFriendshipTitle(currentTitle);
  //     setUser(user);
  //     setProfileUser(profileUser);
  //     setFriendshipLoader(false);
  //   } catch (error) {
  //     throwError(error.response.data.message);
  //   }
  // };

  // const handlePrivacy = (data: 'info' | 'warning') => {
  //   setPrivateViewType(data);
  //   setShowPrivate(true);
  // };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: paramUser.name,
  //   });
  // }, [navigation, paramUser.name]);

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
        {showLoader ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <View style={styles.container}>
              {user && (
                <>
                  <CoverPhoto cover_photo={user.cover_photo} />
                  <Picture picture={user.picture} />
                  <Text style={styles.username}>@{user.username}</Text>
                  <View style={styles.counts}>
                    <Counts
                      number={user.friends_count}
                      description="Amigos"
                      onPress={() => navigation.push('Friends', { user })}
                      // onPress={() =>
                      //   user.can_see_content
                      //     ? navigation.push('Friends', { user })
                      //     : throwError('Conta Privada')
                      // }
                    />
                    <LineY />
                    <Counts
                      number={user.emojis_count}
                      description="Emotes"
                      onPress={() => navigation.navigate('EmojisReceived')}
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
                    {/* <Button
                      type={situation.type}
                      icon={situation.icon}
                      iconSize={30}
                      iconColor="#FFFFFF"
                      onPress={handleFriendship}
                      title={friendshipTitle}
                      loading={friendshipLoader}
                    />
                    <Button
                      style={{ width: 40 }}
                      onPress={() => navigation.navigate('Inbox')}
                      svg="inbox"
                    /> */}
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
                    <TouchableOpacity onPress={() => throwInfo('privacy')}>
                      <Feather
                        name={user.private ? 'lock' : 'unlock'}
                        size={19}
                        color={`${colors.TEXT_DEFAULT}`}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <View style={{ minHeight: 500 }}>
              <UserPrivateTopTabRoutes />
              {/* {profileUser && profileUser.can_see_content ? (
                <UserTopTabRoutes user={profileUser} />
              ) : (
                <UserPrivateTopTabRoutes />
              )} */}
            </View>
          </>
        )}
      </ScrollView>
    </AppView>
  );
};

export default Profile;
