import React, { useEffect, useState } from 'react';
import assets from '@assets/index';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { IUserSocial, IUserSocialType } from '@interfaces/social_network';
import useAuth from '@contexts/auth';
import { Pressable, ImageBackground } from 'react-native';
import { View } from '@components/View';
import { Text } from '@components/Text';
import { userService } from '@services/User';
import { Feather } from '@expo/vector-icons';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { ICreateSocial } from '@services/User/IUserService';
import { ViewUpdate } from '@components/View/ViewUpdate';

import generalstyle from '../styles';
import styles from './styles';

// const assetMapping: Record<string, ImageSourcePropType> = {
//   instagram: assets.instagram,
//   tiktok: assets.tiktok,
//   twitter: assets.twitter,
//   twitch: assets.twitch,
//   youtube: assets.youtube,
// };

const schema = yup.object({
  username: yup.string().required('Informe o nome de usuário'),
});

type SocialFormData = yup.InferType<typeof schema>;

const UpdateSocial: React.FC<NativeStackScreenProps<ParamListBase>> = () => {
  const { user } = useAuth();

  // const [submitType, setSubmitType] = useState<
  //   'create_social' | 'delete_social'
  // >();

  // const [confirm, setConfirm] = useState(false);
  // const [form, setForm] = useState<ICreateSocial | string>();

  const [socialTypes, setSocialTypes] = useState<IUserSocialType[]>([]);
  const [currentType, setCurrentType] = useState<IUserSocialType>();
  const [disabledTypes, setDisabledTypes] = useState<IUserSocialType['name'][]>(
    [],
  );
  const [userSocials, setUserSocials] = useState<IUserSocial[]>([]);
  const [value, setShowValue] = useState('');

  const fetchData = async () => {
    try {
      setUserSocials(user.social_networks);
      const dataSocialTypes = await userService.findSocialTypes();
      setSocialTypes(dataSocialTypes);

      const disableds =
        user.social_networks.length === 0
          ? []
          : user.social_networks.map(userSocial => userSocial.type.name);

      setDisabledTypes(disableds);

      const current = dataSocialTypes.find(
        socialType => !disableds.includes(socialType.name),
      );

      setCurrentType(current);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleCurrentType = (socialType: IUserSocialType) => {
    const isDisabled = disabledTypes.some(
      disabled => disabled === socialType.name,
    );
    if (isDisabled) return;
    setCurrentType(socialType);
  };

  const handleCreateSocial = async (data: SocialFormData) => {
    setSubmitType('create_social');
    setForm({
      username: data.username,
      type_id: currentType.id_social_network_type,
    });
    setConfirm(true);
  };

  const handleDeleteSocial = async (data: IUserSocial) => {
    setSubmitType('delete_social');
    setForm(data.id_social_network);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <ViewUpdate
      name="Ligações a redes sociais"
      description="Você pode editar a suas ligações a qualquer momento."
    >
      <View style={styles.social_container}>
        {socialTypes.map(socialType => (
          <View
            key={socialType.id_social_network_type}
            style={[
              styles.social_wrapper,
              currentType.name === socialType.name && styles.selected,
              disabledTypes.some(disabled => disabled === socialType.name) &&
                styles.disabled,
            ]}
          >
            <Pressable onPress={() => handleCurrentType(socialType)}>
              <ImageBackground
                style={styles.social}
                source={assets[socialType.name]}
              />
            </Pressable>
          </View>
        ))}
      </View>

      <>
        <ControlledTextInput
          name="username"
          title="Nome de usuário"
          control={control}
          icon="user"
          placeholder="@"
          error={errors.username}
          setShowValue={setShowValue}
        />
      </>

      <Text style={styles.preview}>
        {currentType && `${currentType.base_url}${value}`}
      </Text>

      <View style={generalstyle.confirm_button_wrapper}>
        <Button
          onPress={handleSubmit(handleCreateSocial)}
          title="Salvar"
          type="blue"
        />
      </View>

      <View style={styles.user_socials}>
        <Text style={styles.user_socials_title}>Suas Ligações</Text>
        {userSocials.map(social => (
          <View key={social.id_social_network} style={styles.user_social}>
            <ImageBackground
              style={styles.social}
              source={assets[social.type.name]}
            />
            <Text style={styles.user_social_username}>/{social.username}</Text>
            <Pressable onPress={() => handleDeleteSocial(social)}>
              <Feather name="trash-2" size={30} color="white" />
            </Pressable>
          </View>
        ))}
      </View>
    </ViewUpdate>
  );
};

export default UpdateSocial;
