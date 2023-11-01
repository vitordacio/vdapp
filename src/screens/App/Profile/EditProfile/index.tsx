import { Feather } from '@expo/vector-icons';
import { Text } from '@components/Text';
import { CoverPhoto } from '@components/Profile/CoverPhoto';
import { Picture } from '@components/Profile/Picture';
import { AppView, View } from '@components/View';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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
  const [options, setOptions] = useState(
    {} as {
      name: ICardEditOption;
      bio: ICardEditOption;
      location: ICardEditOption;
      gender: ICardEditOption;
      socials: ICardEditOption;
      privacy: ICardEditOption;
      email: ICardEditOption;
      password: ICardEditOption;
    },
  );

  // const handleEditUsername = async () => {
  //   navigation.navigate('EditUsername');
  // };

  useEffect(() => {
    const name: ICardEditOption = {
      title: 'Name',
      redirect: 'EditUsername',
      description: 'Nome do Usuário',
    };
    const bio: ICardEditOption = {
      title: 'Biografia',
      redirect: 'EditBio',
      description: 'Alguma biografia aqui',
    };
    const location: ICardEditOption = {
      title: 'Name',
      redirect: 'EditLocation',
      description: 'Petrolina - PE',
    };
    const gender: ICardEditOption = {
      title: 'Gênero',
      redirect: 'EditGender',
      icon: 'arrow-right',
    };
    const socials: ICardEditOption = {
      title: 'Ligação a redes sociais',
      redirect: 'EditSocials',
      icon: 'plus',
    };
    const privacy: ICardEditOption = {
      title: 'Privacidade',
      redirect: 'EditPrivacy',
      description: 'Seu perfil é público',
      icon: 'arrow-right',
    };
    const email: ICardEditOption = {
      title: 'E-mail',
      redirect: 'EditEmail',
    };
    const password: ICardEditOption = {
      title: 'Senha',
      redirect: 'EditPassword',
    };
    setOptions({
      name,
      bio,
      location,
      gender,
      socials,
      privacy,
      email,
      password,
    });
  }, []);

  // const handleEditPassword = async () => {
  //   navigation.navigate('EditPassword');
  // };

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
            <CardEdit options={[options.name, options.bio, options.location]} />
            <CardEdit options={[options.gender]} />
            <CardEdit options={[options.socials]} />
            <CardEdit options={[options.privacy]} />
            <CardEdit options={[options.email, options.password]} />
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default EditProfile;
