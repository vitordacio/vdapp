import React from 'react';
import useAuth from '@contexts/auth';
import { Button } from '@components/Button';
import { AppView, View } from '@components/View';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Text } from '@components/Text';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  // TouchableWithoutFeedback,
  // Keyboard,
  // KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

const schema = yup.object({
  login: yup.string().required('Informe o e-mail ou nome de usuário'),
  password: yup
    .string()
    .min(6, 'A senha deve ter ao menos 6 dígitos')
    .required('Informe a senha'),
});

type LoginFormData = yup.InferType<typeof schema>;

const Login: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { SignIn, loginError } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    await SignIn({
      login: data.login,
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

  const handleGoogle = async () => {};

  return (
    <AppView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        {/* <KeyboardAvoidingView behavior="position" enabled> */}

        <>
          <ControlledTextInput
            name="login"
            title="E-mail ou nome de usuário"
            control={control}
            icon="mail"
            placeholder="E-mail ou nome de usuário"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.login}
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
          {loginError && (
            <Text style={{ color: 'red', textAlign: 'center' }}>
              {loginError}
            </Text>
          )}
          <Button
            title="Entrar"
            onPress={handleSubmit(handleLogin)}
            style={styles.button}
          />
        </>

        <View style={styles.transition}>
          <View style={styles.half_line} />
          <Text style={styles.or}>OU</Text>
          <View style={styles.half_line} />
        </View>

        <Button
          title="Entrar com Google"
          type="social"
          onPress={handleGoogle}
        />

        <Text style={styles.signup_text}>
          Não tem uma conta?
          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={styles.signup_link}> Criar Conta</Text>
          </TouchableOpacity>
        </Text>

        {/* </KeyboardAvoidingView> */}
        {/* </TouchableWithoutFeedback> */}
      </ScrollView>
    </AppView>
  );
};

export default Login;
