import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

const Home: React.FC<BottomTabScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  console.log(navigation);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
