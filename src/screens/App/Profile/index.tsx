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
import { ActivityIndicator, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';
import { UserTopTabRoutes } from '@routes/user.routes';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import { friendshipService } from '@services/Friendship';
import useAuth from '@contexts/auth';
import styles from './styles';

type Situation = {
  status: 'friends' | 'request_sent' | 'request_received' | '';
  type: 'blue' | 'red' | 'green';
  icon: 'user-plus' | 'user-check' | 'user-x';
};

type UserParam = ParamListBase & {
  profile_id: IUser['id_user'];
};

const Profile: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user, setUser } = useAuth();
  const route = useRoute();
  const { profile_id } = route.params as UserParam;

  const [profileUser, setProfileUser] = useState<IUser>();
  const [responseError, setResponseError] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [friendshipLoader, setFriendshipLoader] = useState(false);
  const [friendshipTitle, setFriendshipTitle] = useState('');
  const [situation, setSituation] = useState({} as Situation);

  const fetchData = async () => {
    setShowLoader(true);
    let currentTitle: string = '';
    let profile: IUser;

    let type: Situation['type'];
    let icon: Situation['icon'];

    try {
      profile = await userService.findById(profile_id);

      const { friendship_status } = profile;

      if (!friendship_status) {
        type = 'blue';
        icon = 'user-plus';
        currentTitle = 'Adicionar amigo';
      } else if (friendship_status === 'request_received') {
        type = 'green';
        icon = 'user-check';
        currentTitle = 'Aceitar amizade';
      } else {
        type = 'red';
        icon = 'user-x';
        currentTitle =
          friendship_status === 'friends'
            ? 'Desfazer amizade'
            : 'Cancelar solicitação';
      }

      const handleSituation: Situation = {
        status: friendship_status,
        type,
        icon,
      };
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
          type: 'red',
          icon: 'user-x',
        });
        currentTitle = 'Cancelar solicitação';
      }
      if (situation.status === 'request_received') {
        await friendshipService.createResponse(profileUser.id_user);
        setSituation({
          status: 'friends',
          type: 'red',
          icon: 'user-x',
        });
        user.friends_count += 1;
        profileUser.friends_count += 1;
        currentTitle = 'Desfazer amizade';
      }
      if (
        situation.status === 'request_sent' ||
        situation.status === 'friends'
      ) {
        await friendshipService.deleteFriendship(profileUser.id_user);
        setSituation({
          status: '',
          type: 'blue',
          icon: 'user-plus',
        });
        user.friends_count -= 1;
        profileUser.friends_count -= 1;
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

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: user.name,
  //   });
  // }, [navigation, user.name]);

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
                        navigation.push('Friends', { profileUser })
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
                    <Feather
                      name={profileUser.private ? 'lock' : 'unlock'}
                      size={19}
                      color={`${colors.TEXT_DEFAULT}`}
                    />
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
    </AppView>
  );
};

export default Profile;
