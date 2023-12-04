import React, { useState } from 'react';

import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAuth from '@contexts/auth';
import { Text } from '@components/Text';
import generalstyle from '@screens/App/Update/styles';
import { RadioInput } from '@components/Input/RadioInput';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import { TextInput } from '@components/Input/TextInput';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';

const UpdateGender: React.FC<NativeStackScreenProps<ParamListBase>> = () => {
  const { user, setUser } = useAuth();

  const [currentValue, setCurrentValue] = useState<IUser['gender']>(
    user.gender || ('' as IUser['gender']),
  );

  const [responseError, setResponseError] = useState('');

  const handleGender = async (gender: IUser['gender']) => {
    let updatedUser: IUser;
    // if (gender && gender !== 'male' && gender !== 'female') setInputValue(null);
    try {
      updatedUser = await userService.updateGender({
        gender: gender || '',
      });
    } catch (error) {
      setResponseError(error.message);
    }
    setUser(updatedUser);
    setCurrentValue(gender);
  };

  // const handleInputText = (e: string) => {
  //   setCurrentValue(e as IUser['gender']);

  //   handleGender(e as IUser['gender']);
  // };

  return (
    <ViewUpdate
      name="Gênero"
      description="Você pode alterar o seu gênero a qualquer momento."
    >
      <RadioInput
        value=""
        title="Prefiro não comentar"
        handleSubmit={handleGender}
        currentValue={currentValue}
      />

      <RadioInput
        value="male"
        title="Masculino"
        handleSubmit={handleGender}
        currentValue={currentValue}
      />

      <RadioInput
        value="female"
        title="Feminino"
        handleSubmit={handleGender}
        currentValue={currentValue}
      />

      <View style={styles.wrapper}>
        <View style={styles.radio_wrapper}>
          <TouchableOpacity
            onPress={() => {
              setCurrentValue('input' as IUser['gender']);
            }}
            style={[
              styles.radio,
              {
                backgroundColor: `${
                  currentValue &&
                  currentValue !== 'male' &&
                  currentValue !== 'female'
                    ? 'blue'
                    : 'white'
                }`,
              },
            ]}
          />
        </View>

        <TextInput
          placeholder="Gênero"
          defaultValue={
            user.gender && user.gender !== 'male' && user.gender !== 'female'
              ? user.gender
              : null
          }
          value={
            user.gender && user.gender !== 'male' && user.gender !== 'female'
              ? user.gender
              : null
          }
          maxLength={30}
          nullMargin
          onChange={(e: null) => handleGender(e)}
        />
      </View>

      <Text style={generalstyle.error}>{responseError}</Text>
    </ViewUpdate>
  );
};

export default UpdateGender;
