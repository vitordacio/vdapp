import { View } from '@components/View';
import { Pressable } from '@components/Pressable';
import React from 'react';
import { Image, ViewProps } from 'react-native';
import styles from './styles';

interface IPicture extends ViewProps {
  picture: string;
  onPress?: () => void;
  card?: boolean;
}

export const Picture: React.FC<IPicture> = ({ picture, card, onPress }) => {
  const handlePicture = async () => {
    if (onPress) onPress();
  };

  return (
    <Pressable
      onPress={handlePicture}
      style={!card ? styles.picture_container : styles.card_container}
    >
      <View style={!card ? styles.picture_content : styles.card_content}>
        <Image
          source={{ uri: picture }}
          style={!card ? styles.picture : styles.card}
        />
      </View>
    </Pressable>
  );
};
