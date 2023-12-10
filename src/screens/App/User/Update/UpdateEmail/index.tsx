import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import useAuth from '@contexts/auth';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from '@components/View';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
});

type EmailFormData = yup.InferType<typeof schema>;

const UpdateEmail: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();

  const splitedEmail = user.email.split('@');
  const email =
    `${splitedEmail[0][0]}***${splitedEmail[0][splitedEmail[0].length - 1]}` +
    '@' +
    `${splitedEmail[1]}`;

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleEmail = async (data: EmailFormData) => {
    setForm(data);
    setConfirm(true);
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
        <Button
          onPress={handleSubmit(handleEmail)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="email"
          description="Tem certeza que deseja mudar a sua localização?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEmail;