import { EditView } from '@components/Profile/EditView';
import React from 'react';
import { Text } from 'react-native';

const EditPassword = () => {
  return (
    <EditView
      name="Nome de Usuário"
      description="A senha precisa ter de seis a trinta caracteres e não deve incluir espaço vazio."
    >
      <Text>teste</Text>
    </EditView>
  );
};

export default EditPassword;
