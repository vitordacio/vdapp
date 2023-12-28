import React, { useState } from 'react';
import { Button } from '@components/Button';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import {
  ICreateSocial,
  IUpdateBio,
  IUpdateEmail,
  IUpdateLocation,
  IUpdateName,
  IUpdatePassword,
  IUpdateUsername,
} from '@services/User/IUserService';
import { AppProps } from '@routes/App/app.routes';
import useMessage from '@contexts/message';
import { ViewUpdate } from '@components/View/ViewUpdate';

export type UpdateUserConfirmProps = {
  name: string;
  description: string;
  data:
    | IUpdateUsername
    | IUpdateName
    | IUpdateEmail
    | IUpdateBio
    | IUpdateLocation
    | IUpdatePassword
    | ICreateSocial
    | string;
  type:
    | 'username'
    | 'password'
    | 'name'
    | 'email'
    | 'bio'
    | 'location'
    | 'create_social'
    | 'delete_social';
};

export const UpdateUserConfirm: React.FC<AppProps> = ({
  navigation,
  route,
}) => {
  const { onUpdateUser, updateUserConfirm } = route.params;

  const { throwInfo, throwError } = useMessage();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const { type, data } = updateUserConfirm;
    let updatedUser: IUser;
    let message: string;

    try {
      if (type === 'username') {
        updatedUser = await userService.updateUsername(data as IUpdateUsername);
        message = 'Nome de usuário alterado com sucesso!';
      }
      if (type === 'name') {
        updatedUser = await userService.updateName(data as IUpdateName);
        message = 'Nome alterado com sucesso!';
      }
      if (type === 'email') {
        updatedUser = await userService.updateEmail(data as IUpdateEmail);
        message = 'E-mail alterado com sucesso!';
      }
      if (type === 'bio') {
        updatedUser = await userService.updateBio(data as IUpdateBio);
        message = 'Biografia alterada com sucesso!';
      }
      if (type === 'location') {
        updatedUser = await userService.updateLocation(data as IUpdateLocation);
        message = 'Localização alterada com sucesso!';
      }
      if (type === 'password') {
        updatedUser = await userService.updatePassword(data as IUpdatePassword);
        message = 'Senha alterada com sucesso!';
      }
      if (type === 'create_social') {
        updatedUser = await userService.createSocial(data as ICreateSocial);
        message = 'Rede social adicionada com sucesso!';
      }
      if (type === 'delete_social') {
        updatedUser = await userService.deleteSocial(data as string);
        message = 'Rede social excluída com sucesso!';
      }
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (updatedUser) {
      onUpdateUser(updatedUser);
      throwInfo(message);
    }

    route.params.updateUserConfirm = null;
    return navigation.navigate('UpdateUserScreen');
  };

  return (
    <ViewUpdate
      name={updateUserConfirm.name}
      description={updateUserConfirm.description}
    >
      <Button
        loading={loading}
        onPress={handleConfirm}
        title="Confirmar"
        type="blue"
      />
    </ViewUpdate>
  );
};
