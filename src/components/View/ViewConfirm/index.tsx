/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { Pressable } from '@components/Pressable';
import { IUpdateUsername, UpdateUsername } from '@services/User/UpdateUsername';
import { UpdateBio, IUpdateBio } from '@services/User/UpdateBio';
import { UpdateGender, IUpdateGender } from '@services/User/UpdateGender';
import { UpdateLocation, IUpdateLocation } from '@services/User/UpdateLocation';
import { UpdateName, IUpdateName } from '@services/User/UpdateName';
import { UpdatePrivacy, IUpdatePrivacy } from '@services/User/UpdatePrivacy';
import { UpdateSocial, IUpdateSocial } from '@services/User/UpdateSocial';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import useAuth from '@contexts/auth';
import { IUser } from '@interfaces/user';
import { AxiosResponse } from 'axios';
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
    | 'social'
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
  const handleSubmit = async () => {
    let response: AxiosResponse<IUser, any>;
    try {
      if (type === 'username') {
        response = await UpdateUsername(data as IUpdateUsername);
      }
      if (type === 'name') {
        response = await UpdateName(data as IUpdateName);
      }
      if (type === 'bio') {
        response = await UpdateBio(data as IUpdateBio);
      }
      if (type === 'location') {
        response = await UpdateLocation(data as IUpdateLocation);
      }
      if (type === 'gender') {
        response = await UpdateGender(data as IUpdateGender);
      }
      if (type === 'social') {
        response = await UpdateSocial(data as IUpdateSocial);
      }
      if (type === 'privacy') {
        response = await UpdatePrivacy(data as IUpdatePrivacy);
      }
    } catch (error) {
      setResponseError(error.response.data.message);
    }

    setUser(response.data);
    navigation.replace('UpdateUser');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.close_content}>
          <Pressable onPress={() => setConfirm(false)}>
            <Feather name="x" size={30} color="black" />
          </Pressable>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.error}>{responseError}</Text>
        <Button type="dark" title="Confirmar" onPress={handleSubmit} />
      </View>
    </View>
  );
};
