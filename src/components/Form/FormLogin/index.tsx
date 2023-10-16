import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import useAuth from '@contexts/auth';
import { ControlledTextInput } from '@components/Input/TextInput/Controlled';

type FormData = {
  email?: string;
  password?: string;
};

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
  password: yup
    .string()
    .min(6, 'A senha deve ter ao menos 6 dígitos')
    .required('Informe a senha'),
});

const FormLogin: React.FC = () => {
  const { SignIn } = useAuth();
  const handleLogin = async (data: FormData) => {
    console.log(data);

    return;
    SignIn();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <ControlledTextInput
        name="email"
        title="E-mail"
        control={control}
        icon="mail"
        placeholder="E-mail"
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
        secureTextEntry
        error={errors.password}
      />

      <Button title="Entrar" onPress={handleSubmit(handleLogin)} />
    </>
  );
};

export default FormLogin;
