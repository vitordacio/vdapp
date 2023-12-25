import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { userService } from '@services/User';
import { View } from '@components/View';
import { IUpdateUsername } from '@services/User/IUserService';
import { AppProps } from '@routes/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  username: yup
    .string()
    .min(4, 'O nome de usuário deve ter ao menos 4 dígitos')
    .max(16, 'O nome de usuário deve ter no máximo 16 dígitos')
    .required('Informe o nome de usuário'),
});

type UsernameFormData = yup.InferType<typeof schema>;

const UpdateUsername: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;

  const handleValid = async (username: string): Promise<boolean> => {
    if (username.length < 4 || username.length > 16) return false;

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) return false;

    try {
      const response = await userService.verifyUsername(username);
      return response;
    } catch (error) {
      return false;
    }
  };

  const handleUsername = async (data: UsernameFormData) => {
    const valid = await handleValid(data.username);
    if (!valid) return;

    route.params.updateUserConfirm = {
      name: 'Nome de Usuário',
      description: 'Tem certeza que deseja mudar o seu nome de usuário?',
      type: 'username',
      data: data as IUpdateUsername,
    };
    navigation.push('UpdateUserConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Nome de Usuário"
      description="Você pode alterar o seu nome de usuário a cada 30 dias. Se alterar o nome de usuário, também altera-rá a ligação do seu perfil."
    >
      <>
        <ControlledTextInput
          name="username"
          control={control}
          icon="at-sign"
          placeholder="Informe um nome de usuário"
          defaultValue={user.username}
          autoCapitalize="none"
          error={errors.username}
          status={handleValid}
          maxLength={16}
        />
      </>
      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleUsername)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateUsername;
