import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';

const schema = yup.object({
  username: yup
    .string()
    .min(5, 'O nome de usuário deve ter ao menos 5 dígitos')
    .required('Informe o nome de usuário'),
});

type UsernameFormData = yup.InferType<typeof schema>;

const EditUsername = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleValid = async (data: string): Promise<boolean> => {
    if (data.length < 5 || data.length > 12) return false;

    return data.includes('b');
  };

  const handleUsername = async (data: UsernameFormData) => {
    const valid = await handleValid(data.username);
    if (!valid) return;
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView
      name="Nome de Usuário"
      description="Você pode alterar o seu nome de usuário a cada 30 dias. Se alterar o nome de usuário, também altera-rá a ligação do seu perfil."
    >
      <>
        <ControlledTextInput
          name="username"
          control={control}
          icon="user"
          placeholder="@nomedeusuario"
          autoCapitalize="none"
          error={errors.username}
          status={handleValid}
        />
      </>
      <Button
        onPress={handleSubmit(handleUsername)}
        title="Salvar"
        type="blue"
      />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="username"
          description="Tem certeza que deseja mudar o seu nome de usuário?"
        />
      )}
    </EditView>
  );
};

export default EditUsername;
