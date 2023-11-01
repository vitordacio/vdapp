import React from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Pressable } from '@components/Pressable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import styles from './styles';

export interface ICardEditOption {
  title: string;
  redirect: string;
  icon?: React.ComponentProps<typeof Feather>['name'];
  description?: string;
}

interface IConfirmEditProps
  extends Partial<NativeStackScreenProps<ParamListBase>> {
  options: ICardEditOption[];
}

export const CardEdit: React.FC<IConfirmEditProps> = ({
  options,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {options &&
        options.map(option => (
          <Pressable onPress={() => navigation.navigate(option.redirect)}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.description}>{option.description}</Text>
            <View style={styles.icon}>
              <Feather name={option.icon || 'edit'} size={30} color="white" />
            </View>
          </Pressable>
        ))}
    </View>
  );
};
