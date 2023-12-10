import { Feather } from '@expo/vector-icons';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  CardUpdateOptions,
  ICardUpdateOption,
} from '@components/Card/UpdateOptions';
import colors from '@styles/colors';
import useAuth from '@contexts/auth';
import { IEvent } from '@interfaces/event';
import styles from './styles';

type EventProps = NativeStackScreenProps<ParamListBase> & {
  paramEvent: IEvent;
};

const UpdateEvent: React.FC<EventProps> = ({ navigation }) => {
  const { user } = useAuth();

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

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.edit_username}>
            <Text style={styles.username}>@{user.username}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdateUsername')}
            >
              <Feather name="edit" size={21} color={`${colors.TEXT_DEFAULT}`} />
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

export default UpdateEvent;
