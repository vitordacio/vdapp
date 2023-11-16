import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ControlledRadioInputs,
  IRadioOption,
} from '@components/Input/RadioInputs';
import { Button } from '@components/Button';
import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ViewConfirm } from '@screens/App/Update/ViewConfirm';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAuth from '@contexts/auth';

const schema = yup.object({
  gender: yup.string().max(30, 'O gênero deve ter no máximo 30 caracteres'),
});

type GenderFormData = yup.InferType<typeof schema>;

const UpdateGender: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const options: IRadioOption[] = [
    { value: 'female', title: 'Feminino' },
    { value: 'male', title: 'Masculino' },
    { value: '', title: 'Prefiro não informar' },
    {
      value: 'custom',
      custom: {
        type: 'text',
        placeholder: `${
          user.gender && user.gender !== 'male' && user.gender !== 'female'
            ? user.gender
            : 'Gênero'
        }`,
        maxLength: 30,
      },
    },
  ];

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
    <ViewUpdate
      name="Gênero"
      description="Você pode alterar o seu gênero a qualquer momento."
    >
      <>
        <ControlledRadioInputs
          name="gender"
          control={control}
          options={options}
          value={user.gender}
          error={errors.gender}
        />
      </>
      <Button onPress={handleSubmit(handleGender)} title="Salvar" type="blue" />
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="gender"
          description="Tem certeza que deseja mudar o seu gênero?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateGender;
