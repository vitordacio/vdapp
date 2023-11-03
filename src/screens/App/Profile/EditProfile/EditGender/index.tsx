import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';

const schema = yup.object({
  gender: yup.string(),
});

type GenderFormData = yup.InferType<typeof schema>;

const EditGender: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleGender = async (data: GenderFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GenderFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView
      name="Gênero"
      description="Você pode alterar o seu gênero a qualquer momento."
    >
      <>
        <ControlledTextInput
          name="gender"
          control={control}
          icon="user"
          placeholder="Nome"
          error={errors.gender}
        />
      </>
      <Button onPress={handleSubmit(handleGender)} title="Salvar" type="blue" />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="gender"
          description="Tem certeza que deseja mudar o seu gênero?"
        />
      )}
    </EditView>
  );
};

export default EditGender;
