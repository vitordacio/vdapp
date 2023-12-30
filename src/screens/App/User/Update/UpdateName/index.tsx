import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppProps } from '@routes/App/app.routes';
import { ICanUpdateResponse, IUpdateName } from '@services/User/IUserService';
import { View } from '@components/View';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { userService } from '@services/User';
import useMessage from '@contexts/message';
import { formatDate } from '@utils/formaters';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

const schema = yup.object({
  name: yup
    .string()
    .min(4, 'O nome deve ter ao menos 4 dígitos')
    .max(30, 'O nome deve ter no máximo 30 dígitos')
    .required('Informe um nome'),
});

type NameFormData = yup.InferType<typeof schema>;

const UpdateName: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const { throwError } = useMessage();

  const [canUpdateResponse, setCanUpdateResponse] =
    useState<ICanUpdateResponse>();

  const handleName = async (data: NameFormData) => {
    route.params.updateUserConfirm = {
      name: 'Nome',
      description: 'Tem certeza que deseja mudar o seu nome?',
      type: 'name',
      data: data as IUpdateName,
    };
    navigation.push('UpdateUserConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleCanUpdate = async () => {
      try {
        const data = await userService.verifyCanUpdate('name');

        setCanUpdateResponse(data);
      } catch (error) {
        throwError(error.response.data.message);
      }
    };

    handleCanUpdate();
  }, []);

  return (
    <ViewUpdate
      name="Nome"
      description="Você pode alterar o seu nome a cada 7 dias."
    >
      <ControlledTextInput
        name="name"
        control={control}
        placeholder="Informe um nome"
        defaultValue={user.name}
        error={errors.name}
        maxLength={30}
      />
      <View style={styles.confirm_button_wrapper}>
        {canUpdateResponse ? (
          <>
            {!canUpdateResponse.canUpdate && (
              <Text
                style={styles.info}
              >{`Por favor, aguarde 7 dias a partir da sua última modificação. ${
                canUpdateResponse.update &&
                formatDate(canUpdateResponse.update.created_at, user.locale)
              }`}</Text>
            )}
            {canUpdateResponse.canUpdate ? (
              <Button onPress={handleSubmit(handleName)} title="Continuar" />
            ) : (
              <Button
                onPress={() =>
                  throwError('Não é possível alterar o nome no momento')
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

export default UpdateName;
