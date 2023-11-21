import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ParamListBase, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
// import { Socials } from '@components/Socials';
import React, { useEffect, useState } from 'react';
import { Counts } from '@components/Counts';
import { LineY } from '@components/Line';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';
import { UserTopTabRoutes } from '@routes/user.routes';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import { friendshipService } from '@services/Friendship';
import useAuth from '@contexts/auth';
import styles from './styles';
import { ViewPrivate } from './ViewPrivate';

type Situation = {
  status: 'friends' | 'request_sent' | 'request_received' | '';
  type: 'blue' | 'red' | 'green' | 'gray';
  icon: 'user-plus' | 'user-check' | 'user-x' | 'user-minus';
};

type UserParam = ParamListBase & {
  user: IUser;
};

const Profile: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user, setUser } = useAuth();
  const route = useRoute();
  const { user: paramUser } = route.params as UserParam;

  const [profileUser, setProfileUser] = useState<IUser>();
  const [responseError, setResponseError] = useState<string>();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showPrivate, setShowPrivate] = useState<boolean>(false);
  const [privateViewType, setPrivateViewType] = useState<'info' | 'warning'>();
  const [canSeeContent, setCanSeeContent] = useState<boolean>();
  const [friendshipLoader, setFriendshipLoader] = useState<boolean>(false);
  const [friendshipTitle, setFriendshipTitle] = useState<string>('');
  const [situation, setSituation] = useState({} as Situation);

  const fetchData = async () => {
    setShowLoader(true);
    let currentTitle: string = '';
    let profile: IUser;

    let type: Situation['type'];
    let icon: Situation['icon'];

    try {
      profile = await userService.findById(paramUser.id_user);

      const { friendship_status } = profile;

      if (!friendship_status) {
        type = 'blue';
        icon = 'user-plus';
        currentTitle = 'Adicionar amigo';
      } else if (friendship_status === 'request_received') {
        type = 'green';
        icon = 'user-check';
        currentTitle = 'Aceitar amizade';
      } else if (friendship_status === 'request_sent') {
        type = 'gray';
        icon = 'user-x';
        currentTitle = 'Cancelar solicitação';
      } else {
        type = 'red';
        icon = 'user-minus';
        currentTitle = 'Desfazer amizade';
      }

      const handleSituation: Situation = {
        status: friendship_status,
        type,
        icon,
      };

      setCanSeeContent(
        !profile.private ? true : friendship_status === 'friends',
      );
      setSituation(handleSituation);
      setFriendshipTitle(currentTitle);
      setProfileUser(profile);
      setShowLoader(false);
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  const handleFriendship = async () => {
    setFriendshipLoader(true);
    let currentTitle: string = '';

    try {
      if (!situation.status) {
        await friendshipService.createRequest(profileUser.id_user);
        setSituation({
          status: 'request_sent',
          type: 'gray',
          icon: 'user-x',
        });
        currentTitle = 'Cancelar solicitação';
      } else if (situation.status === 'request_received') {
        await friendshipService.createResponse(profileUser.id_user);
        setSituation({
          status: 'friends',
          type: 'red',
          icon: 'user-minus',
        });
        user.friends_count += 1;
        profileUser.friends_count += 1;
        currentTitle = 'Desfazer amizade';
      } else {
        await friendshipService.deleteFriendship(profileUser.id_user);
        setSituation({
          status: '',
          type: 'blue',
          icon: 'user-plus',
        });
        if (situation.status === 'friends') {
          user.friends_count -= 1;
          profileUser.friends_count -= 1;
        }
        currentTitle = 'Adicionar amigo';
      }

      setFriendshipTitle(currentTitle);
      setUser(user);
      setProfileUser(profileUser);
      setFriendshipLoader(false);
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  const handlePrivacy = (data: 'info' | 'warning') => {
    setPrivateViewType(data);
    setShowPrivate(true);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: paramUser.name,
    });
  }, [navigation, paramUser.name]);

  useEffect(() => {
    fetchData();
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
            {responseError && <Text style={styles.error}>{responseError}</Text>}
            <View style={styles.container}>
              {profileUser && (
                <>
                  <CoverPhoto cover_photo={profileUser.cover_photo} />
                  <Picture picture={profileUser.picture} />
                  <Text style={styles.username}>@{profileUser.username}</Text>
                  <View style={styles.counts}>
                    <Counts
                      number={profileUser.friends_count}
                      description="Amigos"
                      onPress={() =>
                        canSeeContent
                          ? navigation.push('Friends', { user: profileUser })
                          : handlePrivacy('warning')
                      }
                    />
                    <LineY />
                    <Counts
                      number={profileUser.emojis_count}
                      description="Emotes"
                      onPress={() => navigation.navigate('EmojisReceived')}
                    />
                  </View>
                  <View style={styles.buttons}>
                    <Button
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
                    />
                  </View>
                  {profileUser.location && (
                    <View style={styles.location}>
                      <Icon
                        name="location"
                        style={{ height: 19, width: 11.83 }}
                      />
                      <Text style={styles.text}>{profileUser.location}</Text>
                    </View>
                  )}
                  {profileUser.bio && (
                    <Text style={styles.text}>{profileUser.bio}</Text>
                  )}
                  <View style={styles.private}>
                    <TouchableOpacity onPress={() => handlePrivacy('info')}>
                      <Feather
                        name={profileUser.private ? 'lock' : 'unlock'}
                        size={19}
                        color={`${colors.TEXT_DEFAULT}`}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <View style={{ minHeight: 500 }}>
              <UserTopTabRoutes />
            </View>
          </>
        )}
      </ScrollView>
      {showPrivate && (
        <ViewPrivate
          setConfirm={setShowPrivate}
          type={privateViewType}
          is_private={profileUser.private}
        />
      )}
    </AppView>
  );
};

export default Profile;
