import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import useAuth from '@contexts/auth';
import { ControlledTextInput } from '@components/Input/TextInput';
import styles from './styles';

const schema = yup.object({
  email: yup.string().required('Informe o e-mail'),
  password: yup
    .string()
    .min(6, 'A senha deve ter ao menos 6 dígitos')
    .required('Informe a senha'),
});

type LoginFormData = yup.InferType<typeof schema>;

const FormLogin: React.FC = () => {
  const { SignIn, status } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    await SignIn({
      email: data.email,
      password: data.password,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <ControlledTextInput
        name="email"
        title="E-mail ou nome de usuário"
        control={control}
        icon="mail"
        placeholder="E-mail ou nome de usuário"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />

      <ControlledTextInput
        name="password"
        title="Senha"
        control={control}
        icon="lock"
        placeholder="Senha"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        error={errors.password}
      />
      {status && (
        <Text style={{ color: 'red', textAlign: 'center' }}>{status}</Text>
      )}
      <Button
        title="Entrar"
        onPress={handleSubmit(handleLogin)}
        style={styles.button}
      />
    </>
  );
};

export default FormLogin;
