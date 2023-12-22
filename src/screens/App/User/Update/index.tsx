import { Text } from '@components/Text';
import { Picture } from '@components/Picture';
import { CoverPhoto } from '@components/CoverPhoto';
import { AppView, View } from '@components/View';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  CardUpdateOptions,
  ICardUpdateOption,
} from '@components/Card/UpdateOptions';
import { AppProps } from '@routes/app.routes';
import { Icon } from '@components/Icon';
import styles from './styles';

const UpdateUser: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;

  const options = {
    name: {
      title: 'Nome',
      redirect: 'UpdateName',
      description: `${user.name}`,
    },
    bio: {
      title: 'Biografia',
      redirect: 'UpdateBio',
      description: `${user.bio || 'Adicione uma biografia'}`,
    },
    location: {
      title: 'Localização',
      redirect: 'UpdateLocation',
      description: `${user.location || 'Adicione uma localização'}`,
    },
    gender: {
      title: 'Gênero',
      redirect: 'UpdateGender',
      icon: 'arrow-right',
    },
    socials: {
      title: 'Ligação a redes sociais',
      redirect: 'UpdateSocial',
      icon: 'plus',
    },
    privacy: {
      title: 'Privacidade',
      redirect: 'UpdatePrivacy',
      icon: 'arrow-right',
      description: `${
        user.private ? 'Seu perfil é privado' : 'Seu perfil é público'
      }`,
    },
    email: {
      title: 'E-mail',
      redirect: 'UpdateEmail',
    },
    password: {
      title: 'Senha',
      redirect: 'UpdatePassword',
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
          <TouchableOpacity
            style={styles.picture_container}
            onPress={handlePicture}
          >
            <Picture picture={user.picture} />
            <View style={styles.camera}>
              <Icon name="camera" size={17} />
            </View>
          </TouchableOpacity>
          <View style={styles.edit_username}>
            <Text style={styles.username}>@{user.username}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdateUsername')}
            >
              <Icon name="edit" size={21} />
            </TouchableOpacity>
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
