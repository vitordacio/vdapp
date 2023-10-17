import { Button } from '@components/Button';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

const Profile: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const handleTest = async () => {
    console.log(navigation);
    navigation.navigate('Event');
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={handleTest} title="Go to Event" />
    </View>
  );
};

export default Profile;
