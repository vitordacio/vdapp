import { AppView } from '@components/View';
import { Text } from '@components/Text';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FormSignUp from '@components/Form/FormSignUp';
import styles from './styles';

const SignUp: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  return (
    <AppView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="position" enabled>
            <FormSignUp navigation={navigation} />

            <Text style={styles.login_text}>
              Já tem uma conta?
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.login_link}> Entrar</Text>
              </TouchableOpacity>
            </Text>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </AppView>
  );
};

export default SignUp;
