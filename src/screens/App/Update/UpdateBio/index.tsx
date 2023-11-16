import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ViewConfirm } from '@screens/App/Update/ViewConfirm';
import useAuth from '@contexts/auth';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const schema = yup.object({
  bio: yup.string().max(150, 'A biografia deve ter no máximo 150 dígitos'),
});

type BioFormData = yup.InferType<typeof schema>;

const UpdateBio: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();

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
    <ViewUpdate
      name="Biografia"
      description="Você pode editar a sua biografia a qualquer momento."
    >
      <ControlledTextInput
        name="bio"
        control={control}
        placeholder={`${user.bio || 'Biografia'}`}
        error={errors.bio}
        lengthMax={150}
      />

      <Button onPress={handleSubmit(handleBio)} title="Salvar" type="blue" />
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="bio"
          description="Tem certeza que deseja mudar a sua biografia?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateBio;
