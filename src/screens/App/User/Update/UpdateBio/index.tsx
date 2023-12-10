import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import useAuth from '@contexts/auth';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from '@components/View';
import { ViewConfirm } from '../ViewConfirm';
import { ViewUpdate } from '../ViewUpdate';
import styles from '../styles';

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
        error={errors.bio}
        lengthMax={150}
        placeholder="Informe uma biografia"
        defaultValue={user.bio}
      />

      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleBio)} title="Salvar" type="blue" />
      </View>

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
