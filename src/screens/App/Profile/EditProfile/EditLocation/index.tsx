import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';

const schema = yup.object({
  location: yup.string(),
});

type LocationFormData = yup.InferType<typeof schema>;

const EditLocation: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleLocation = async (data: LocationFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView
      name="Localização"
      description="Você pode editar a sua localização a qualquer momento."
    >
      <>
        <ControlledTextInput
          name="location"
          control={control}
          icon="user"
          placeholder="Nome"
          error={errors.location}
        />
      </>
      <Button
        onPress={handleSubmit(handleLocation)}
        title="Salvar"
        type="blue"
      />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="location"
          description="Tem certeza que deseja mudar a sua localização?"
        />
      )}
    </EditView>
  );
};

export default EditLocation;
