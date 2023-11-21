import * as yup from 'yup';
import { Button } from '@components/Button';
import { ControlledTextInput } from '@components/Input/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ViewConfirm } from '@screens/App/Update/ViewConfirm';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from '@components/View';
import styles from '@screens/App/Update/styles';

const schema = yup.object({
  password: yup.string().required('Informe a senha atual'),
  new_password: yup
    .string()
    .min(6, 'A nova senha deve ter ao menos 6 dígitos')
    .max(30, 'A nova senha deve no máximo 30 dígitos')
    .required('Informe a nova senha'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('new_password')], 'A senha de confirmação não confere.')
    .required('Informe a senha de confirmação'),
});

type PasswordFormData = yup.InferType<typeof schema>;

const UpdatePassword: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handlePassword = async (data: PasswordFormData) => {
    const { password, new_password } = data;
    setForm({ password, new_password });
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Senha"
      description="A senha precisa ter de seis a trinta caracteres e não deve incluir espaço vazio."
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
        <Button
          onPress={handleSubmit(handlePassword)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="password"
          description="Tem certeza que deseja mudar a sua senha?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdatePassword;
