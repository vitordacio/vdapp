// import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import welcome from '@assets/welcome.svg';
import styles from './styles';

const Welcome: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  return (
    <ImageBackground style={styles.container} source={welcome}>
      <Text style={styles.text_welcome}>Bem-vindo ao</Text>
      <Text style={styles.text_app_name}>BORA</Text>
      <View style={styles.buttons}>
        <Button title="Entrar" onPress={() => navigation.navigate('Login')} />
        <Button
          title="Criar Conta"
          onPress={() => navigation.navigate('SignUp')}
          type="dark"
        />
      </View>
    </ImageBackground>
  );
};

export default Welcome;
