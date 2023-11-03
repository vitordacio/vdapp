import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';

const schema = yup.object({
  privacy: yup.string(),
});

type PrivacyFormData = yup.InferType<typeof schema>;

const EditPrivacy: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handlePrivacy = async (data: PrivacyFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrivacyFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView
      name="Privacidade da conta"
      description="Quem pode ver seu conteúdo"
    >
      <>
        <ControlledTextInput
          name="privacy"
          control={control}
          icon="user"
          placeholder="Nome"
          error={errors.privacy}
        />
      </>
      <Button
        onPress={handleSubmit(handlePrivacy)}
        title="Salvar"
        type="blue"
      />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="privacy"
          description="Tem certeza que deseja mudar a sua localização?"
        />
      )}
    </EditView>
  );
};

export default EditPrivacy;
