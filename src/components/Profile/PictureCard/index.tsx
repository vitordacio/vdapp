import { View } from '@components/View';
import React from 'react';
import styles from './styles';

export const PictureCard: React.FC = () => {
  return (
    <View style={styles.picture_container}>
      <View style={styles.picture_content}>
        <View style={styles.picture} />
      </View>
    </View>
  );
};
