import React, { useState } from 'react';
import { ViewUpdate } from '@screens/App/Update/ViewUpdate';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAuth from '@contexts/auth';
import { Text } from '@components/Text';
import { userService } from '@services/User';
import { View } from '@components/View';
import { IUser } from '@interfaces/user';
import { ActivityIndicator, Switch } from 'react-native';
import styles from './styles';

const UpdatePrivacy: React.FC<NativeStackScreenProps<ParamListBase>> = () => {
  const { user, setUser } = useAuth();
  const [value, setValue] = useState(user.private);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('');

  const handlePrivate = async () => {
    setLoading(true);

    let updatedUser: IUser;
    try {
      updatedUser = await userService.updatePrivacy({
        private: !value,
      });
    } catch (error) {
      setResponseError(error.message);
    }
    setUser(updatedUser);
    setValue(prev => !prev);
    setLoading(false);
  };

  return (
    <ViewUpdate
      name="Privacidade da conta"
      description="Quem pode ver seu conteúdo"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Conta Privada</Text>
        <View style={styles.switch}>
          {!loading ? (
            <Switch
              onValueChange={handlePrivate}
              value={value}
              // trackColor={{
              //   false: `${colors.GRAY_DESCRIPTION}`,
              //   true: `${colors.BLUE_BUTTON}`,
              // }}
              // thumbColor="yellow"
            />
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
      </View>
      <Text style={styles.user_private}>
        {value ? 'Seu perfil está privado' : 'Seu perfil está público'}
      </Text>
      <Text style={styles.error}>{responseError}</Text>

      <Text style={[styles.details, { marginBottom: 14 }]}>
        Quando sua conta é pública, seu perfil e publicações podem ser vistos
        por todos dentro do app.
      </Text>
      <Text style={styles.details}>
        Quando sua conta é privada, somente os seus amigos podem ver o que você
        compartilha, como eventos, participações, emotes enviados e conquistas,
        bem como suas listas de amigos e de emotes recebidos.
      </Text>
    </ViewUpdate>
  );
};

export default UpdatePrivacy;
