import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';

const schema = yup.object({
  bio: yup.string(),
});

type BioFormData = yup.InferType<typeof schema>;

const EditBio: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleBio = async (data: BioFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BioFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView
      name="Biografia"
      description="Você pode editar a sua biografia a qualquer momento."
    >
      <ControlledTextInput
        name="bio"
        control={control}
        placeholder="Biografia"
        error={errors.bio}
        lengthMax={80}
      />

      <Button onPress={handleSubmit(handleBio)} title="Salvar" type="blue" />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="bio"
          description="Tem certeza que deseja mudar a sua biografia?"
        />
      )}
    </EditView>
  );
};

export default EditBio;
