import { Button } from '@components/Button';
import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import FormLogin from '@components/Form/FormLogin';
import styles from './styles';

const Login: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const handleGoogle = async () => {};

  return (
    <AppView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <Button
            title="Entrar com Google"
            type="social"
            onPress={handleGoogle}
          />
          <View style={styles.transition}>
            <View style={styles.half_line} />
            <Text style={styles.or}>OU</Text>
            <View style={styles.half_line} />
          </View>
          <FormLogin />
          {/* <Button
            title="Não tenho conta"
            onPress={() => navigation.replace('SignUp')}
          /> */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AppView>
  );
};

export default Login;
