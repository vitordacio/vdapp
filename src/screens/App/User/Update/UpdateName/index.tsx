import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { AppProps } from '@routes/app.routes';
import { IUpdateName } from '@services/User/IUserService';
import { View } from '@components/View';
import { ViewUpdate } from '@components/View/ViewUpdate';
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

  return (
    <ViewUpdate
      name="Nome"
      description="Você pode alterar o seu nome uma vez a cada 7 dias."
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
        <Button onPress={handleSubmit(handleName)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateName;
