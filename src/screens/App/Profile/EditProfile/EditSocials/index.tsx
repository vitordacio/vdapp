import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditView } from '@components/Profile/EditView';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';
import { Socials } from '@components/Profile/Socials';

const schema = yup.object({
  socials: yup.string(),
});

type SocialsFormData = yup.InferType<typeof schema>;

const EditSocials: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleSocials = async (data: SocialsFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialsFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView
      name="Ligações a redes sociais"
      description="Você pode editar a suas ligações a qualquer momento."
    >
      <Socials
        socials={['instagram', 'twitter', 'tiktok', 'twitch', 'youtube']}
      />
      <>
        <ControlledTextInput
          name="socials"
          control={control}
          icon="user"
          placeholder="Nome"
          error={errors.socials}
        />
      </>
      <Button
        onPress={handleSubmit(handleSocials)}
        title="Salvar"
        type="blue"
      />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="socials"
          description="Tem certeza que deseja adicionar a ligação a rede social?"
        />
      )}
    </EditView>
  );
};

export default EditSocials;
