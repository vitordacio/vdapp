import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ParamListBase, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import { Socials } from '@components/Socials';
import React from 'react';
import { Counts } from '@components/Counts';
import { LineY } from '@components/Line';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';
import { UserTopTabRoutes } from '@routes/user.routes';
import { IUser } from '@interfaces/user';
import styles from './styles';

type UserParam = ParamListBase & {
  user: IUser;
};

const Profile: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const route = useRoute();
  const { user } = route.params as UserParam;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: user.name,
    });
  }, [navigation, user.name]);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CoverPhoto cover_photo={user.cover_photo} />
          <Picture picture={user.picture} />
          <Text style={styles.username}>@{user.username}</Text>
          <Socials
            socials={['instagram', 'twitter', 'tiktok', 'twitch', 'youtube']}
          />
          <View style={styles.counts}>
            <Counts
              number={user.friends_count}
              description="Amigos"
              onPress={() => navigation.push('Friends', { user })}
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
              style={{ width: 165 }}
              onPress={() => navigation.navigate('UpdateUser')}
              title="Editar Perfil"
              icon="edit"
            />
            <Button
              style={{ width: 40 }}
              onPress={() => navigation.navigate('Inbox')}
              svg="inbox"
            />
          </View>
          {user.location && (
            <View style={styles.location}>
              <Icon name="location" style={{ height: 19, width: 11.83 }} />
              <Text style={styles.text}>{user.location}</Text>
            </View>
          )}
          {user.bio && <Text style={styles.text}>{user.bio}</Text>}
          <View style={styles.private}>
            <Feather
              name={user.private ? 'lock' : 'unlock'}
              size={19}
              color={`${colors.TEXT_DEFAULT}`}
            />
          </View>
        </View>
        <View style={{ minHeight: 500 }}>
          <UserTopTabRoutes />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default Profile;
