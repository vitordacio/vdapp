import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateBio } from '@services/User/IUserService';
import { AppProps } from '@routes/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  bio: yup.string().max(150, 'A biografia deve ter no máximo 150 dígitos'),
});

type BioFormData = yup.InferType<typeof schema>;

const UpdateBio: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;

  const handleBio = async (data: BioFormData) => {
    route.params.confirm = {
      name: 'Biografia',
      description: 'Tem certeza que deseja mudar a sua biografia?',
      type: 'bio',
      data: data as IUpdateBio,
    };
    navigation.push('UpdateUserConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BioFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Biografia"
      description="Você pode editar a sua biografia a qualquer momento."
    >
      <ControlledTextInput
        name="bio"
        control={control}
        error={errors.bio}
        lengthMax={150}
        placeholder="Informe uma biografia"
        defaultValue={user.bio}
      />

      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleBio)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateBio;
