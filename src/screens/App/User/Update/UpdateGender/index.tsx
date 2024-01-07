import React, { useState } from 'react';
import { RadioInput } from '@components/Input/RadioInput';
import { IUser } from '@interfaces/user';
import { userService } from '@services/User';
import { TextInput } from '@components/Input/TextInput';
import { View, TouchableOpacity } from 'react-native';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import useMessage from '@contexts/message';
import styles from './styles';

const UpdateGender: React.FC<AppProps> = ({ route }) => {
  const { user } = route.params;
  const { throwError } = useMessage();

  const [currentValue, setCurrentValue] = useState<IUser['gender']>(
    user.gender || ('' as IUser['gender']),
  );

  const handleGender = async (gender: IUser['gender']) => {
    let updatedUser: IUser;
    try {
      updatedUser = await userService.updateGender({
        gender: gender || '',
      });

      route.params.user = updatedUser;
    } catch (error) {
      throwError(error.response.data.message);
    }

    setCurrentValue(gender);
  };

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
    </ViewUpdate>
  );
};

export default UpdateGender;
