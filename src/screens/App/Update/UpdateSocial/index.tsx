import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { Socials } from '@components/Profile/Socials';
import { ViewConfirm } from '@components/View/ViewConfirm';
import { ViewUpdate } from '@components/View/ViewUpdate';

const schema = yup.object({
  socials: yup.string(),
});

type SocialFormData = yup.InferType<typeof schema>;

const UpdateSocial: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleSocials = async (data: SocialFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
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
        <ViewConfirm
          data={form}
          setConfirm={setConfirm}
          type="social"
          description="Tem certeza que deseja adicionar a ligação a rede social?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateSocial;
