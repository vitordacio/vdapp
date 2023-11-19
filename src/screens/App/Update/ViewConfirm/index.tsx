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
  IUpdateGender,
  IUpdateLocation,
  IUpdateName,
  IUpdatePassword,
  IUpdatePrivacy,
  ICreateSocial,
  IUpdateUsername,
} from '@services/User/IUserService';

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
    | 'gender'
    | 'privacy'
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
  const { user, setUser } = useAuth();
  const [responseError, setResponseError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponseError('');
    let updatedUser: IUser;

    try {
      if (type === 'username') {
        updatedUser = await userService.updateUsername(data as IUpdateUsername);
      }
      if (type === 'name') {
        updatedUser = await userService.updateName(data as IUpdateName);
      }
      if (type === 'bio') {
        updatedUser = await userService.updateBio(data as IUpdateBio);
      }
      if (type === 'location') {
        updatedUser = await userService.updateLocation(data as IUpdateLocation);
      }
      if (type === 'gender') {
        updatedUser = await userService.updateGender(data as IUpdateGender);
      }
      if (type === 'privacy') {
        updatedUser = await userService.updatePrivacy(data as IUpdatePrivacy);
      }
      if (type === 'password') {
        updatedUser = await userService.updatePassword(data as IUpdatePassword);
      }
      if (type === 'create_social') {
        const social = await userService.createSocial(data as ICreateSocial);
        user.social_networks.push(social);
        updatedUser = user;
      }
      if (type === 'delete_social') {
        await userService.deleteSocial(data as string);
        user.social_networks.filter(
          social => social.id_social_network !== data,
        );
        updatedUser = user;
      }
    } catch (error) {
      setResponseError(error.message);
    }

    setUser(updatedUser);
    return updatedUser && navigation.goBack();
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
