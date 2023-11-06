import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import { Socials } from '@components/Profile/Socials';
import React from 'react';
import { Counts } from '@components/Profile/Counts';
import { LineY } from '@components/Line';
import { ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';
import { ProfileTopTabRoutes } from '@routes/profile.routes';
import useAuth from '@contexts/auth';
import styles from './styles';

const User: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();
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
              number={87}
              description="Amigos"
              onPress={() => navigation.navigate('Friends')}
            />
            <LineY />
            <Counts
              number={85}
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
            <Feather name="lock" size={24} color={`${colors.TEXT_DEFAULT}`} />
          </View>
        </View>
        <View style={{ minHeight: 500 }}>
          <ProfileTopTabRoutes />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default User;
