import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { ViewConfirm } from '@components/View/ViewConfirm';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAuth from '@contexts/auth';
import { ControlledSwitchInput } from '@components/Input/SwitchInput';
import { Text } from '@components/Text';
import colors from '@styles/colors';

const schema = yup.object({
  privacy: yup.boolean(),
});

type PrivacyFormData = yup.InferType<typeof schema>;

const UpdatePrivacy: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { user } = useAuth();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handlePrivacy = async (data: PrivacyFormData) => {
    setForm({ private: data.privacy });
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
    <ViewUpdate
      name="Privacidade da conta"
      description="Quem pode ver seu conteúdo"
    >
      <>
        <ControlledSwitchInput
          name="privacy"
          control={control}
          title="Conta Privada"
          error={errors.privacy}
          value={user.private}
        />
      </>
      <Button
        onPress={handleSubmit(handlePrivacy)}
        title="Salvar"
        type="blue"
      />
      <Text
        style={{
          color: `${colors.GRAY_DESCRIPTION}`,
          fontSize: 16,
          marginTop: 37,
          marginBottom: 14,
        }}
      >
        Quando sua conta é pública, seu perfil e publicações podem ser vistos
        por todos dentro do app.
      </Text>
      <Text style={{ color: `${colors.GRAY_DESCRIPTION}`, fontSize: 16 }}>
        Quando sua conta é privada, somente os seus amigos podem ver o que você
        compartilha, como eventos, participações, emotes enviados e conquistas,
        bem como suas listas de amigos e de emotes recebidos.
      </Text>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="privacy"
          description="Tem certeza que deseja mudar a sua localização?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdatePrivacy;
