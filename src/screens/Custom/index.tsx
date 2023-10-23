import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

const Custom: React.FC<NativeStackScreenProps<ParamListBase>> = () => {
  return (
    <View>
      <Text>Custom</Text>
    </View>
  );
};

export default Custom;
