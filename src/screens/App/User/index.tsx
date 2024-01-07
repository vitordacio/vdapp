import React from 'react';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import { Socials } from '@components/Socials';
import { Counts } from '@components/Counts';
import { LineY } from '@components/Line';
import { ScrollView } from 'react-native';
import { Icon } from '@components/Icon';
import { UserTopTabRoutes } from '@routes/App/BottomTab/User/UserTopTab';
import { AppProps } from '@routes/App/app.routes';
import { Pressable } from '@components/Pressable';
import useMessage from '@contexts/message';
import styles from './styles';

const User: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;

  const { throwInfo } = useMessage();

  const handleFriends = () => {
    route.params.user_friends = user;
    navigation.push('Friends');
  };

  const handleReactsReceived = () => {
    route.params.user_reacts_received = user;
    navigation.push('ReactsReceived');
  };

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <>
            <View style={styles.container}>
              <CoverPhoto cover_photo={user.cover_photo} />
              <Picture picture={user.picture} />
              {user.username && (
                <Text style={styles.username}>@{user.username}</Text>
              )}
              {user.social_networks && user.social_networks.length !== 0 && (
                <Socials socials={user.social_networks} />
              )}
              <View style={styles.counts}>
                <Counts
                  number={user.friends_count}
                  description="Amigos"
                  onPress={handleFriends}
                />
                <LineY />
                <Counts
                  number={user.reacts_count}
                  description="Reações"
                  onPress={handleReactsReceived}
                />
              </View>
              <View style={styles.buttons}>
                <Button
                  style={{ width: 165 }}
                  onPress={() => navigation.push('UpdateUser')}
                  title="Editar Perfil"
                  icon="edit"
                />
                <Button
                  style={{ width: 40 }}
                  onPress={() => navigation.push('Inbox')}
                  icon="inbox"
                />
              </View>
              {user.location && (
                <View style={styles.container_text}>
                  <Icon name="location" />
                  <Text style={styles.text}>{user.location}</Text>
                </View>
              )}
              {user.bio && (
                <View style={styles.container_text}>
                  <Icon name="attach" />
                  <Text style={styles.text}>{user.bio}</Text>
                </View>
              )}
              <View style={styles.private}>
                <Pressable
                  onPress={() =>
                    throwInfo(
                      `Seu perfil é ${user.private ? 'privado' : 'público'}.`,
                    )
                  }
                >
                  <Icon name={user.private ? 'lock' : 'unlock'} size={19} />
                </Pressable>
              </View>
            </View>
            <View style={{ minHeight: 800 }}>
              <UserTopTabRoutes navigation={navigation} route={route} />
            </View>
          </>
        )}
      </ScrollView>
    </AppView>
  );
};

export default User;
