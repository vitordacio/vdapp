import { View } from '@components/View';
import { Pressable } from '@components/Pressable';
import React from 'react';
import { Image, ViewProps } from 'react-native';
import styles from './styles';

interface IPicture extends ViewProps {
  picture: string;
}

export const Picture: React.FC<IPicture> = ({ picture }) => {
  const handlePicture = async () => {
    console.log('picture');
  };

  return (
    <View style={styles.picture_container}>
      <View style={styles.picture_content}>
        <Pressable onPress={handlePicture} style={styles.picture}>
          {picture && (
            <Image
              source={{ uri: picture }}
              style={{ flex: 1, resizeMode: 'cover' }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};
