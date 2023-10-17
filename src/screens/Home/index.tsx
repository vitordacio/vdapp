import { Button } from '@components/Button';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

const Home: React.FC<BottomTabScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const handleTest = async () => {
    console.log(navigation);
    navigation.navigate('Event');
  };

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={handleTest} title="Go to Event" />
    </View>
  );
};

export default Home;
