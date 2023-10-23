import { Pressable } from '@components/Pressable';
import React from 'react';
import { Text } from '@components/Text';
import { TextProps } from 'react-native';
import styles from './styles';

interface ICountProps extends TextProps {
  number: number;
  description: string;
}

export const Counts: React.FC<ICountProps> = ({ number, description }) => {
  const handleTest = async () => {
    console.log('picture');
  };

  return (
    <Pressable onPress={handleTest} style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
};
