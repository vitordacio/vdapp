import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledRadioInput } from '@components/Input/RadioInput';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ViewConfirm } from '@components/View/ViewConfirm';
import { ViewUpdate } from '@components/View/ViewUpdate';

const schema = yup.object({
  gender: yup.string().max(30, 'O gênero deve ter no máximo 30 caracteres'),
});

type GenderFormData = yup.InferType<typeof schema>;

const UpdateGender: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  // const options: IRadioOptions[] = [
  //   {value: 'female', title: 'Feminino'},
  //   {value: 'male', title: 'masculino'},
  //   {value: '', title: 'Prefiro não informar'},
  // ]

  const handleGender = async (data: GenderFormData) => {
    console.log('gender', data);
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
        <ControlledTextInput
          name="gender"
          control={control}
          icon="user"
          placeholder="Nome"
          error={errors.gender}
        />
        <ControlledRadioInput
          name="gender"
          value="female"
          title="Feminino"
          control={control}
          error={errors.gender}
        />
        <ControlledRadioInput
          name="gender"
          value="male"
          title="Masculino"
          control={control}
          error={errors.gender}
        />
      </>
      <Button onPress={handleSubmit(handleGender)} title="Salvar" type="blue" />
      {confirm && (
        <ViewConfirm
          data={form}
          setConfirm={setConfirm}
          type="gender"
          description="Tem certeza que deseja mudar o seu gênero?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateGender;
