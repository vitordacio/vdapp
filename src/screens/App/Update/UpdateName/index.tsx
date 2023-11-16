import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ViewConfirm } from '@screens/App/Update/ViewConfirm';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAuth from '@contexts/auth';

const schema = yup.object({
  name: yup
    .string()
    .min(3, 'O nome deve ter ao menos 3 dígitos')
    .max(30, 'O nome deve ter no máximo 30 dígitos')
    .required('Informe um nome'),
});

type NameFormData = yup.InferType<typeof schema>;

const UpdateName: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleName = async (data: NameFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Nome"
      description="Você pode alterar o seu nome uma vez a cada 7 dias."
    >
      <>
        <ControlledTextInput
          name="name"
          control={control}
          placeholder={`${user.name}`}
          error={errors.name}
          maxLength={30}
        />
      </>
      <Button onPress={handleSubmit(handleName)} title="Salvar" type="blue" />
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="name"
          description="Tem certeza que deseja mudar o seu nome?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateName;
