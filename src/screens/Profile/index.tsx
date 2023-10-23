import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picture } from '@components/Profile/Picture';
import { CoverPhoto } from '@components/Profile/CoverPhoto';
import { Socials } from '@components/Profile/Socials';
import React from 'react';
import { Counts } from '@components/Profile/Counts';
import { LineY } from '@components/Line';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';

import styles from './styles';

interface IUser {
  username: 'string';
  friendship_count: number;
  emoji_count: number;
  location: string;
  bio: string;
  private: boolean;
}

interface IProfile extends NativeStackScreenProps<ParamListBase> {
  user: IUser;
}

const Profile: React.FC<IProfile> = ({ navigation, user }) => {
  console.log(navigation);

  const handleEditProfile = async () => {
    console.log('go to profile');
  };

  const handleInbox = async () => {
    console.log('go to inbox');
  };

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CoverPhoto />
          <Picture />
          <Text style={styles.username}>{user.username}</Text>
          <Socials socials={['instagram', 'twitter', 'tiktok', 'twitch']} />
          <View style={styles.counts}>
            <Counts number={user.friendship_count} description="Amigos" />
            <LineY />
            <Counts number={user.emoji_count} description="Emotes" />
          </View>
          <View style={styles.buttons}>
            <Button
              style={{ width: 165 }}
              onPress={handleEditProfile}
              title="Editar Perfil"
              icon="edit"
            />
            <Button style={{ width: 40 }} onPress={handleInbox} svg="inbox" />
          </View>
          <View style={styles.location}>
            <Icon name="location" style={{ height: 19, width: 11.83 }} />
            <Text style={styles.text}>{user.location}</Text>
          </View>
          <Text style={styles.text}>{user.bio}</Text>
          <View style={styles.private}>
            <Feather
              name={user.private ? 'lock' : 'unlock'}
              size={24}
              color={`${colors.TEXT_DEFAULT}`}
            />
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default Profile;
