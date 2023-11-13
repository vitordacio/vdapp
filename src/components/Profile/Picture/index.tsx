import { View } from '@components/View';
import { Pressable } from '@components/Pressable';
import React from 'react';
import { Image, ViewProps } from 'react-native';
import styles from './styles';

interface IPicture extends ViewProps {
  picture: string;
  onClick?: () => void;
  card?: boolean;
}

export const Picture: React.FC<IPicture> = ({ picture, onClick, card }) => {
  const handlePicture = async () => {
    onClick();
  };

  return (
    <View style={!card ? styles.picture_container : styles.card_container}>
      <View style={!card ? styles.picture_content : styles.card_content}>
        <Pressable
          onPress={handlePicture}
          style={!card ? styles.picture : styles.card}
        >
          {picture && <Image source={{ uri: picture }} style={{ flex: 1 }} />}
        </Pressable>
      </View>
    </View>
  );
};
