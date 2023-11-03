import { Feather } from '@expo/vector-icons';
import { Text } from '@components/Text';
import { CoverPhoto } from '@components/Profile/CoverPhoto';
import { Picture } from '@components/Profile/Picture';
import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  ICardEditOption,
  CardEdit,
} from '@components/Profile/EditView/CardEdit';
import colors from '@styles/colors';
import styles from './styles';

const EditProfile: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const options = {
    name: {
      title: 'Name',
      redirect: 'EditName',
      description: 'Nome do Usuário',
    },
    bio: {
      title: 'Biografia',
      redirect: 'EditBio',
      description: 'Alguma biografia aqui',
    },
    location: {
      title: 'Localização',
      redirect: 'EditLocation',
      description: 'Petrolina - PE',
    },
    gender: {
      title: 'Gênero',
      redirect: 'EditGender',
      icon: 'arrow-right',
    },
    socials: {
      title: 'Ligação a redes sociais',
      redirect: 'EditSocials',
      icon: 'plus',
    },
    privacy: {
      title: 'Privacidade',
      redirect: 'EditPrivacy',
      description: 'Seu perfil é público',
      icon: 'arrow-right',
    },
    email: {
      title: 'E-mail',
      redirect: 'EditEmail',
    },
    password: {
      title: 'Senha',
      redirect: 'EditPassword',
    },
  } as {
    name: ICardEditOption;
    bio: ICardEditOption;
    location: ICardEditOption;
    gender: ICardEditOption;
    socials: ICardEditOption;
    privacy: ICardEditOption;
    email: ICardEditOption;
    password: ICardEditOption;
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
          <View style={styles.picture_container}>
            <Picture />
            <View style={styles.camera}>
              <Feather
                name="camera"
                size={28}
                color={`${colors.TEXT_DEFAULT}`}
              />
            </View>
          </View>
          <View style={styles.edit_username}>
            <Text style={styles.username}>@nomedeusuario</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditUsername')}
            >
              <Feather name="edit" size={28} color={`${colors.TEXT_DEFAULT}`} />
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <CardEdit
              navigation={navigation}
              options={[options.name, options.bio, options.location]}
            />
            <CardEdit navigation={navigation} options={[options.gender]} />
            <CardEdit navigation={navigation} options={[options.socials]} />
            <CardEdit navigation={navigation} options={[options.privacy]} />
            <CardEdit
              navigation={navigation}
              options={[options.email, options.password]}
            />
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default EditProfile;
