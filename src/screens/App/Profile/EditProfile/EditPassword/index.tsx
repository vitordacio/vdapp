import * as yup from 'yup';
import { Button } from '@components/Button';
import { ControlledTextInput } from '@components/Input/TextInput';
import { EditView } from '@components/Profile/EditView';
import { ConfirmEdit } from '@components/Profile/EditView/ConfirmEdit';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const schema = yup.object({
  current_password: yup
    .string()
    .min(6, 'A senha deve ter ao menos 6 dígitos')
    .required('Informe a senha atual'),
  password: yup
    .string()
    .min(6, 'A senha deve ter ao menos 6 dígitos')
    .required('Informe a nova senha'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'A senha de confirmação não confere.')
    .required('Informe a senha de confirmação'),
});

type EditPasswordFormData = yup.InferType<typeof schema>;

const EditPassword: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handlePassword = async (data: EditPasswordFormData) => {
    setForm(data);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <EditView
      name="Senha"
      description="A senha precisa ter de seis a trinta caracteres e não deve incluir espaço vazio."
    >
      <>
        <ControlledTextInput
          name="current_password"
          control={control}
          title="Senha atual"
          placeholder="Senha Atual"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.current_password}
          secureTextEntry
        />
        <ControlledTextInput
          control={control}
          name="password"
          title="Nova Senha"
          placeholder="Nova Senha"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          error={errors.password}
        />

        <ControlledTextInput
          control={control}
          name="password_confirm"
          title="Confirmar Nova Senha"
          placeholder="Nova Senha"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          error={errors.password_confirm}
        />
      </>
      <Button
        onPress={handleSubmit(handlePassword)}
        title="Salvar"
        type="blue"
      />
      {confirm && (
        <ConfirmEdit
          data={form}
          setConfirm={setConfirm}
          type="password"
          description="Tem certeza que deseja mudar a sua senha?"
        />
      )}
    </EditView>
  );
};

export default EditPassword;
