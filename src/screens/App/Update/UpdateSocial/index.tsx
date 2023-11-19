import React, { useEffect, useState } from 'react';
import assets from '@assets/index';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ViewConfirm } from '@screens/App/Update/ViewConfirm';
import { IUserSocialType } from '@interfaces/social_network';
import useAuth from '@contexts/auth';
import { Pressable, ImageBackground, ImageSourcePropType } from 'react-native';
import { View } from '@components/View';
import { Text } from '@components/Text';
import { userService } from '@services/User';
import styles from './styles';

const assetMapping: Record<string, ImageSourcePropType> = {
  instagram: assets.instagram,
  tiktok: assets.tiktok,
  twitter: assets.twitter,
  twitch: assets.twitch,
  youtube: assets.youtube,
};

const schema = yup.object({
  username: yup.string().required('Informe o nome de usuário'),
});

type SocialFormData = yup.InferType<typeof schema>;

const UpdateSocial: React.FC = () => {
  const { user } = useAuth();

  const [confirm, setConfirm] = useState(false);
  const [value, setShowValue] = useState('');
  const [form, setForm] = useState({});
  const [currentType, setCurrentType] = useState<IUserSocialType['type']>();
  const [disabledTypes, setDisabledTypes] = useState<IUserSocialType['type'][]>(
    [],
  );
  const [socialTypes, setSocialTypes] = useState<IUserSocialType[]>([]);

  const fetchData = async () => {
    // setSocials(['instagram', 'tiktok', 'twitter', 'twitch', 'youtube']);

    // setCurrentType(
    //   user.social_networks.length !== 0
    //     ? user.social_networks[0].type.type
    //     : null,
    // );

    try {
      const dataSocialTypes = await userService.findSocialTypes();
      setSocialTypes([...dataSocialTypes]);

      if (user.social_networks.length !== 0) {
        const disableds: IUserSocialType['type'][] = [];
        user.social_networks.forEach(userSocial => {
          const toDisable = dataSocialTypes.find(
            dataSocial =>
              dataSocial.id_social_network_type === userSocial.type_id,
          );
          if (!toDisable) return;
          disableds.push(toDisable.type);
        });
        setDisabledTypes(disableds);
        // const current = dataSocialTypes.find(socialType => {
        //   !disableds.some(disabled => disabled === socialType.type)
        // })
        // setCurrentType(current.type)
        const current = dataSocialTypes.find(
          socialType => !disableds.includes(socialType.type),
        );
        setCurrentType(current ? current.type : 'instagram');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleCurrentType = (socialType: IUserSocialType) => {
    const isDisabled = disabledTypes.some(
      disabled => disabled === socialType.type,
    );
    if (isDisabled) return;
    setCurrentType(socialType.type);
  };

  const handleCreateSocial = async (data: SocialFormData) => {
    setForm({
      username: data.username,
      type: currentType,
    });
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
  }, []);

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
              currentType === socialType.type && { borderColor: 'white' },
              disabledTypes.some(disabled => disabled === socialType.type) &&
                styles.disabled,
            ]}
          >
            <Pressable onPress={() => handleCurrentType(socialType)}>
              <ImageBackground
                style={styles.social}
                source={assetMapping[socialType.type]}
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
        {currentType && `${currentType}.com/${value}`}
      </Text>

      <Button
        onPress={handleSubmit(handleCreateSocial)}
        title="Salvar"
        type="blue"
      />
      {confirm && (
        <ViewConfirm
          data={form}
          setConfirm={setConfirm}
          type="create_social"
          description="Tem certeza que deseja adicionar a ligação a rede social?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateSocial;
