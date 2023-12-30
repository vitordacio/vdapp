import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { ICanUpdateResponse, IUpdateEmail } from '@services/User/IUserService';
import { ViewUpdate } from '@components/View/ViewUpdate';
import useMessage from '@contexts/message';
import { userService } from '@services/User';
import { formatDate } from '@utils/formaters';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
});

type EmailFormData = yup.InferType<typeof schema>;

const UpdateEmail: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const { throwError } = useMessage();

  const [canUpdateResponse, setCanUpdateResponse] =
    useState<ICanUpdateResponse>();

  const splitedEmail = user.email.split('@');
  const email =
    `${splitedEmail[0][0]}***${splitedEmail[0][splitedEmail[0].length - 1]}` +
    '@' +
    `${splitedEmail[1]}`;

  const handleEmail = async (data: EmailFormData) => {
    route.params.updateUserConfirm = {
      name: 'E-mail',
      description: 'Tem certeza que deseja mudar o seu email?',
      type: 'email',
      data: data as IUpdateEmail,
    };
    navigation.push('UpdateUserConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleCanUpdate = async () => {
      try {
        const data = await userService.verifyCanUpdate('email');

        setCanUpdateResponse(data);
      } catch (error) {
        throwError(error.response.data.message);
      }
    };

    handleCanUpdate();
  }, []);

  return (
    <ViewUpdate
      name="E-mail"
      description={`${email}. Você pode alterar o seu nome a cada 30 dias.`}
    >
      <>
        <ControlledTextInput
          name="email"
          control={control}
          icon="mail"
          placeholder="Informe um e-mail"
          defaultValue={user.email}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
      </>
      <View style={styles.confirm_button_wrapper}>
        {canUpdateResponse ? (
          <>
            {!canUpdateResponse.canUpdate && (
              <Text
                style={styles.info}
              >{`Por favor, aguarde 30 dias a partir da sua última modificação. ${
                canUpdateResponse.update &&
                formatDate(canUpdateResponse.update.created_at, user.locale)
              }`}</Text>
            )}
            {canUpdateResponse.canUpdate ? (
              <Button onPress={handleSubmit(handleEmail)} title="Continuar" />
            ) : (
              <Button
                onPress={() =>
                  throwError('Não é possível alterar o e-mail no momento')
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

export default UpdateEmail;
