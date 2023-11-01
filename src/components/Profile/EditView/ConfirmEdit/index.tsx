/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text } from '@components/Text';
import { ViewProps } from 'react-native';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { Pressable } from '@components/Pressable';
import styles from './styles';

interface IConfirmEditProps extends ViewProps {
  data: any;
  type: string;
  setConfirm: any;
  description: string;
}

export const ConfirmEdit: React.FC<IConfirmEditProps> = ({
  setConfirm,
  type,
  data,
  description,
}) => {
  const handleSubmit = async () => {
    console.log('confirm');
    console.log('type', type);
    console.log('data', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.close_content}>
          <Pressable onPress={() => setConfirm(false)}>
            <Feather name="x" size={30} color="black" />
          </Pressable>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Button type="dark" title="Confirmar" onPress={handleSubmit} />
      </View>
    </View>
  );
};
