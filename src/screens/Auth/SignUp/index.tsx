import { AppView } from '@components/View';
import { Text } from '@components/Text';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { ControlledTextInput } from '@components/Input/TextInput';
import { CreateUser } from '@services/User/CreateUser';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import FormSignUp from '@components/Form/FormSignUp';
import { VerifyUsername } from '@services/User/VerifyUsername';
import styles from './styles';

const schema = yup.object({
  name: yup.string().min(3).max(30).required('Informe o seu nome'),
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
  const [errorMsg, setErrorMsg] = useState();

  const handleValid = async (username: string): Promise<boolean> => {
    if (username.length < 4 || username.length > 16) return false;

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) return false;

    try {
      const { data } = await VerifyUsername(username);
      return data as unknown as boolean;
    } catch (error) {
      return false;
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    const valid = await handleValid(data.username);
    if (!valid) return;

    try {
      await CreateUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigation.replace('Login');
    } catch (error) {
      setErrorMsg(error.response.data.message);
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="position" enabled>
            {/* <FormSignUp navigation={navigation} /> */}
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
              {errorMsg && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errorMsg}
                </Text>
              )}
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
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </AppView>
  );
};

export default SignUp;
