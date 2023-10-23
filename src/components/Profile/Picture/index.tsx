import { View } from '@components/View';
import { Pressable } from '@components/Pressable';
import React from 'react';
import styles from './styles';

export const Picture: React.FC = () => {
  const handleTest = async () => {
    console.log('picture');
  };

  return (
    <View style={styles.picture_container}>
      <View style={styles.picture_content}>
        <Pressable onPress={handleTest} style={styles.picture} />
      </View>
    </View>
  );
};
