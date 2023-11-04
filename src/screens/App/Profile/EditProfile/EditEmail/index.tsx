import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
});

type EmailFormData = yup.InferType<typeof schema>;

const EditEmail: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleEmail = async (data: EmailFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView name="E-mail" description="e***o@email.com">
      <>
        <ControlledTextInput
          name="email"
          control={control}
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
      </>
      <Button onPress={handleSubmit(handleEmail)} title="Salvar" type="blue" />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="email"
          description="Tem certeza que deseja mudar a sua localização?"
        />
      )}
    </EditView>
  );
};

export default EditEmail;
