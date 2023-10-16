import { Button } from '@components/Button';
import { AppView } from '@components/View';
import { Text } from '@components/Text';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

const SignUp: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  return (
    <AppView>
      <Text>SignUp</Text>
      <Button
        title="Já tenho conta"
        onPress={() => navigation.replace('Login')}
      />
    </AppView>
  );
};

export default SignUp;
