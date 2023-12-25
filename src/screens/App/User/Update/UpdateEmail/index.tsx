import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { AppProps } from '@routes/app.routes';
import { IUpdateEmail } from '@services/User/IUserService';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
});

type EmailFormData = yup.InferType<typeof schema>;

const UpdateEmail: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;

  const splitedEmail = user.email.split('@');
  const email =
    `${splitedEmail[0][0]}***${splitedEmail[0][splitedEmail[0].length - 1]}` +
    '@' +
    `${splitedEmail[1]}`;

  const handleEmail = async (data: EmailFormData) => {
    route.params.updateUserConfirm = {
      name: 'E-mail',
      description: 'Tem certeza que deseja mudar o seu email?',
      type: 'email',
      data: data as IUpdateEmail,
    };
    navigation.push('UpdateUserConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate name="E-mail" description={email}>
      <>
        <ControlledTextInput
          name="email"
          control={control}
          icon="mail"
          placeholder="Informe um e-mail"
          defaultValue={user.email}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
      </>
      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleEmail)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEmail;
