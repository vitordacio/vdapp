import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { ControlledTextInput } from '@components/Input/TextInput';
import styles from './styles';

const schema = yup.object({
  name: yup.string().required('Informe o seu nome'),
  username: yup.string().required('Informe o nome de usuário'),
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
  password: yup
    .string()
    .min(6, 'A senha deve ter ao menos 6 dígitos')
    .required('Informe a senha'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'A senha de confirmação não confere.')
    .required('Informe a senha de confirmação'),
});

type SignUpFormData = yup.InferType<typeof schema>;

const FormSignUp: React.FC = () => {
  const handleSignUp = async (data: SignUpFormData) => {
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <ControlledTextInput
        control={control}
        icon="user"
        name="name"
        title="Nome"
        placeholder="Nome"
        error={errors.name}
      />

      <ControlledTextInput
        control={control}
        icon="at-sign"
        name="username"
        title="Nome de Usuário"
        placeholder="Nome de Usuário"
        autoCapitalize="none"
        error={errors.username}
      />

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
        control={control}
        name="password"
        title="Senha"
        placeholder="Senha"
        icon="lock"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        error={errors.password}
      />

      <ControlledTextInput
        control={control}
        name="password_confirm"
        title="Confirmar Senha"
        placeholder="Confirmar Senha"
        icon="lock"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        error={errors.password_confirm}
      />

      <Button
        title="Criar Conta"
        onPress={handleSubmit(handleSignUp)}
        style={styles.button}
      />
    </>
  );
};

export default FormSignUp;
