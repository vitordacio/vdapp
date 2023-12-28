import { Text } from '@components/Text';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import { AppView, View } from '@components/View';
import React from 'react';
import { ScrollView } from 'react-native';
import {
  CardUpdateOptions,
  ICardUpdateOption,
} from '@components/Card/UpdateOptions';
import { AppProps } from '@routes/App/app.routes';
import { Icon } from '@components/Icon';
import { Pressable } from '@components/Pressable';
import styles from './styles';

const UpdateUser: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;

  const options = {
    name: {
      title: 'Nome',
      redirect: 'UpdateUserName',
      description: `${user.name}`,
    },
    bio: {
      title: 'Biografia',
      redirect: 'UpdateUserBio',
      description: `${user.bio || 'Adicione uma biografia'}`,
    },
    location: {
      title: 'Localização',
      redirect: 'UpdateUserLocation',
      description: `${user.location || 'Adicione uma localização'}`,
    },
    gender: {
      title: 'Gênero',
      redirect: 'UpdateUserGender',
      icon: 'arrow-right',
    },
    socials: {
      title: 'Ligação a redes sociais',
      redirect: 'UpdateUserSocial',
      icon: 'plus',
    },
    privacy: {
      title: 'Privacidade',
      redirect: 'UpdateUserPrivacy',
      icon: 'arrow-right',
      description: `${
        user.private ? 'Seu perfil é privado' : 'Seu perfil é público'
      }`,
    },
    email: {
      title: 'E-mail',
      redirect: 'UpdateUserEmail',
    },
    password: {
      title: 'Senha',
      redirect: 'UpdateUserPassword',
    },
  } as {
    name: ICardUpdateOption;
    bio: ICardUpdateOption;
    location: ICardUpdateOption;
    gender: ICardUpdateOption;
    socials: ICardUpdateOption;
    privacy: ICardUpdateOption;
    email: ICardUpdateOption;
    password: ICardUpdateOption;
  };

  const handlePicture = () => {};

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CoverPhoto cover_photo={user.cover_photo} />
          <Pressable style={styles.picture_container} onPress={handlePicture}>
            <Picture picture={user.picture} />
            <View style={styles.camera}>
              <Icon name="camera" size={17} />
            </View>
          </Pressable>
          <View style={styles.edit_username}>
            <Text style={styles.username}>@{user.username}</Text>
            <Pressable
              onPress={() => navigation.navigate('UpdateUserUsername')}
            >
              <Icon name="edit" size={21} />
            </Pressable>
          </View>
          <View style={styles.options}>
            <CardUpdateOptions
              navigation={navigation}
              options={[options.name, options.bio, options.location]}
            />
            <CardUpdateOptions
              navigation={navigation}
              options={[options.gender]}
            />
            <CardUpdateOptions
              navigation={navigation}
              options={[options.socials]}
            />
            <CardUpdateOptions
              navigation={navigation}
              options={[options.privacy]}
            />
            <CardUpdateOptions
              navigation={navigation}
              options={[options.email, options.password]}
            />
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default UpdateUser;
