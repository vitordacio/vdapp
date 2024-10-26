import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { ControlledTextInput } from '@components/Input/TextInput';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { userService } from '@services/User';
import useMessage from '@contexts/message';
import styles from './styles';

const schema = yup.object({
  name: yup
    .string()
    .min(4, 'O nome deve ter ao menos 4 dígitos')
    .max(30, 'O nome deve ter no máximo 30 dígitos')
    .required('Informe o seu nome'),
  username: yup
    .string()
    .min(4, 'O nome de usuário deve ter ao menos 4 dígitos')
    .max(16, 'O nome de usuário deve ter no máximo 16 dígitos')
    .required('Informe o nome de usuário'),
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

const SignUp: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { throwInfo, throwError } = useMessage();

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

  const handleSignUp = async (data: SignUpFormData) => {
    const valid = await handleValid(data.username);
    if (!valid) return;

    try {
      await userService.createUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      throwInfo('Usuário criado com sucesso.');
      navigation.replace('Login');
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
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
              name="username"
              title="Nome de Usuário"
              control={control}
              icon="at-sign"
              placeholder="Nome de Usuário"
              autoCapitalize="none"
              error={errors.username}
              status={handleValid}
              maxLength={16}
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

          <Text style={styles.login_text}>
            Já tem uma conta?
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.login_link}> Entrar</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default SignUp;
