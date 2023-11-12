import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { ViewConfirm } from '@components/View/ViewConfirm';
import useAuth from '@contexts/auth';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const schema = yup.object({
  location: yup.string().max(30, 'A localização deve ter no máximo 30 dígitos'),
});

type LocationFormData = yup.InferType<typeof schema>;

const UpdateLocation: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();
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
    <ViewUpdate
      name="Localização"
      description="Você pode editar a sua localização a qualquer momento."
    >
      <>
        <ControlledTextInput
          name="location"
          control={control}
          placeholder={`${user.location || 'Localização'}`}
          error={errors.location}
          maxLength={30}
        />
      </>
      <Button
        onPress={handleSubmit(handleLocation)}
        title="Salvar"
        type="blue"
      />
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="location"
          description="Tem certeza que deseja mudar a sua localização?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateLocation;
