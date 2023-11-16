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
  IUpdateSocial,
  IUpdateUsername,
} from '@services/User/IUserService';

import styles from './styles';

interface IViewConfirmProps
  extends Partial<NativeStackScreenProps<ParamListBase>> {
  data: object;
  type:
    | 'username'
    | 'password'
    | 'name'
    | 'email'
    | 'bio'
    | 'location'
    | 'gender'
    | 'socials'
    | 'privacy';
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
      if (type === 'socials') {
        updatedUser = await userService.updateSocial(data as IUpdateSocial);
      }
      if (type === 'privacy') {
        updatedUser = await userService.updatePrivacy(data as IUpdatePrivacy);
      }
      if (type === 'password') {
        updatedUser = await userService.updatePassword(data as IUpdatePassword);
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