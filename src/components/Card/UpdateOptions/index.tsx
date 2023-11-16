import React from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Pressable } from '@components/Pressable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import styles from './styles';

export interface ICardUpdateOption {
  title: string;
  redirect: string;
  icon?: React.ComponentProps<typeof Feather>['name'];
  description?: string;
}

interface IConfirmUpdateProps
  extends Partial<NativeStackScreenProps<ParamListBase>> {
  options: ICardUpdateOption[];
}

export const CardUpdateOptions: React.FC<IConfirmUpdateProps> = ({
  options,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {options &&
        options.map(option => (
          <Pressable
            style={styles.option}
            key={option.title}
            onPress={() => navigation.navigate(option.redirect)}
          >
            <Text style={styles.title}>{option.title}</Text>

            {option.description && (
              <Text style={styles.description}>{option.description}</Text>
            )}

            <View style={styles.icon}>
              <Feather name={option.icon || 'edit'} size={19} color="white" />
            </View>
          </Pressable>
        ))}
    </View>
  );
};