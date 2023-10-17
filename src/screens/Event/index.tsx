import { Button } from '@components/Button';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

const Event: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const handleTest = async () => {
    navigation.push('Home');
  };
  const handleTest2 = async () => {
    navigation.push('Profile');
  };
  return (
    <View>
      <Text>Event</Text>
      <Button onPress={handleTest} title="Go to Home" />
      <Button onPress={handleTest2} title="Go to Profile" />
    </View>
  );
};

export default Event;
