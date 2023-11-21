import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import useAuth from '@contexts/auth';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ViewConfirm } from '@screens/App/Update/ViewConfirm';
import { userService } from '@services/User';
import { View } from '@components/View';
import styles from '@screens/App/Update/styles';

const schema = yup.object({
  username: yup
    .string()
    .min(4, 'O nome de usuário deve ter ao menos 4 dígitos')
    .max(16, 'O nome de usuário deve ter no máximo 16 dígitos')
    .required('Informe o nome de usuário'),
});

type UsernameFormData = yup.InferType<typeof schema>;

const UpdateUsername: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

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
    setForm(data);
    setConfirm(true);
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
        <Button
          onPress={handleSubmit(handleUsername)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="username"
          description="Tem certeza que deseja mudar o seu nome de usuário?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateUsername;
