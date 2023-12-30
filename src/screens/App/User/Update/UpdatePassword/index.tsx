import * as yup from 'yup';
import { Button } from '@components/Button';
import { ControlledTextInput } from '@components/Input/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from '@components/View';
import { Text } from '@components/Text';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import {
  ICanUpdateResponse,
  IUpdatePassword,
} from '@services/User/IUserService';
import useMessage from '@contexts/message';
import { userService } from '@services/User';
import { formatDate } from '@utils/formaters';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

const schema = yup.object({
  password: yup
    .string()
    .min(6, 'A senha deve ter ao menos 6 dígitos')
    .max(30, 'A senha deve no máximo 30 dígitos')
    .required('Informe a senha atual'),
  new_password: yup
    .string()
    .min(6, 'A nova senha deve ter ao menos 6 dígitos')
    .max(30, 'A nova senha deve no máximo 30 dígitos')
    .required('Informe a nova senha'),
  password_confirm: yup
    .string()
    .min(6, 'A senha de confirmação deve ter ao menos 6 dígitos')
    .max(30, 'A senha de confirmação deve no máximo 30 dígitos')
    .oneOf([yup.ref('new_password')], 'A senha de confirmação não confere.')
    .required('Informe a senha de confirmação'),
});

type PasswordFormData = yup.InferType<typeof schema>;

const UpdatePassword: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const { throwError } = useMessage();

  const [canUpdateResponse, setCanUpdateResponse] =
    useState<ICanUpdateResponse>();

  const handlePassword = async (data: PasswordFormData) => {
    const { password, new_password } = data;
    route.params.updateUserConfirm = {
      name: 'Senha',
      description: 'Tem certeza que deseja mudar a sua senha?',
      type: 'password',
      data: { password, new_password } as IUpdatePassword,
    };
    navigation.push('UpdateUserConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleCanUpdate = async () => {
      try {
        const data = await userService.verifyCanUpdate('password');

        setCanUpdateResponse(data);
      } catch (error) {
        throwError(error.response.data.message);
      }
    };

    handleCanUpdate();
  }, []);

  return (
    <ViewUpdate
      name="Senha"
      description="A senha precisa ter de seis a trinta caracteres e não deve incluir espaço vazio. Você pode alterar o seu nome de usuário a cada 5 dias."
    >
      <>
        <ControlledTextInput
          name="password"
          control={control}
          title="Senha atual"
          placeholder="Senha Atual"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.password}
          secureTextEntry
          maxLength={30}
        />
        <ControlledTextInput
          control={control}
          name="new_password"
          title="Nova Senha"
          placeholder="Nova Senha"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          error={errors.new_password}
          maxLength={30}
        />
        <ControlledTextInput
          control={control}
          name="password_confirm"
          title="Confirmar Nova Senha"
          placeholder="Nova Senha"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          error={errors.password_confirm}
          maxLength={30}
        />
      </>

      <View style={styles.confirm_button_wrapper}>
        {canUpdateResponse ? (
          <>
            {!canUpdateResponse.canUpdate && (
              <Text
                style={styles.info}
              >{`Por favor, aguarde 5 dias a partir da sua última modificação. ${
                canUpdateResponse.update &&
                formatDate(canUpdateResponse.update.created_at, user.locale)
              }`}</Text>
            )}
            {canUpdateResponse.canUpdate ? (
              <Button
                onPress={handleSubmit(handlePassword)}
                title="Continuar"
              />
            ) : (
              <Button
                onPress={() =>
                  throwError('Não é possível alterar a senha no momento')
                }
                title="Continuar"
                disabled={true}
              />
            )}
          </>
        ) : (
          <Loading size={32} />
        )}
      </View>
    </ViewUpdate>
  );
};

export default UpdatePassword;
