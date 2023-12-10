import React, { useState } from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { Pressable } from '@components/Pressable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import useAuth from '@contexts/auth';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import {
  IUpdateBio,
  IUpdateLocation,
  IUpdateName,
  IUpdatePassword,
  ICreateSocial,
  IUpdateUsername,
} from '@services/User/IUserService';
import useMessage from '@contexts/message';
import styles from './styles';

interface IViewConfirmProps
  extends Partial<NativeStackScreenProps<ParamListBase>> {
  data: object | string;
  type:
    | 'username'
    | 'password'
    | 'name'
    | 'email'
    | 'bio'
    | 'location'
    | 'create_social'
    | 'delete_social';
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}

export const ViewConfirm: React.FC<IViewConfirmProps> = ({
  setConfirm,
  type,
  data,
  description,
  navigation,
}) => {
  const { setUser } = useAuth();
  const { setMessage, handleEntering, setMessageType } = useMessage();
  const [responseError, setResponseError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponseError('');
    let updatedUser: IUser;
    let message: string;
    let msgType = 'info';

    try {
      if (type === 'username') {
        updatedUser = await userService.updateUsername(data as IUpdateUsername);
        message = 'Nome de usuário alterado';
      }
      if (type === 'name') {
        updatedUser = await userService.updateName(data as IUpdateName);
        message = 'Nome alterado';
      }
      if (type === 'bio') {
        updatedUser = await userService.updateBio(data as IUpdateBio);
        message = 'Biografia alterada';
      }
      if (type === 'location') {
        updatedUser = await userService.updateLocation(data as IUpdateLocation);
        message = 'Localização alterada';
      }
      if (type === 'password') {
        updatedUser = await userService.updatePassword(data as IUpdatePassword);
        message = 'Senha alterada';
      }
      if (type === 'create_social') {
        updatedUser = await userService.createSocial(data as ICreateSocial);
        message = 'Rede social adicionada';
      }
      if (type === 'delete_social') {
        updatedUser = await userService.deleteSocial(data as string);
        message = 'Rede social excluída';
      }
    } catch (error) {
      msgType = 'alert';
      message = error.response.data.message;
    }

    setMessage(`${message} com sucesso!`);
    setMessageType(msgType);
    handleEntering();

    if (msgType !== 'alert') setUser(updatedUser);

    const goBack =
      (type !== 'create_social' && type !== 'delete_social') ||
      msgType === 'alert';
    return goBack ? navigation.goBack() : setConfirm(false);
  };

  return (
    <Pressable style={styles.container} onPress={() => setConfirm(false)}>
      <View style={styles.content}>
        <View style={styles.close_content}>
          <Pressable onPress={() => setConfirm(false)}>
            <Feather name="x" size={30} color="black" />
          </Pressable>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.error}>{responseError}</Text>
        <Button
          type="dark"
          title="Confirmar"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </Pressable>
  );
};
