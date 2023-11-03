import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';

const schema = yup.object({
  name: yup
    .string()
    .min(5, 'O nome deve ter ao menos 5 dígitos')
    .required('Informe o nome de usuário'),
});

type NameFormData = yup.InferType<typeof schema>;

const EditName: React.FC = () => {
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
    <EditView
      name="Nome"
      description="Você pode alterar o seu nome uma vez a cada 7 dias."
    >
      <>
        <ControlledTextInput
          name="name"
          control={control}
          icon="user"
          placeholder="Nome"
          error={errors.name}
        />
      </>
      <Button onPress={handleSubmit(handleName)} title="Salvar" type="blue" />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="name"
          description="Tem certeza que deseja mudar o seu nome?"
        />
      )}
    </EditView>
  );
};

export default EditName;
