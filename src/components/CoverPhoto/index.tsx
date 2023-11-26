import React from 'react';
import { Image, ViewProps, TouchableOpacity } from 'react-native';
import styles from './styles';

interface IPicture extends ViewProps {
  cover_photo: string;
}

export const CoverPhoto: React.FC<IPicture> = ({ cover_photo }) => {
  const handleCoverPhoto = async () => {};

  return (
    // <View style={styles.cover_photo}>
    <TouchableOpacity onPress={handleCoverPhoto} style={styles.cover_photo}>
      {cover_photo && (
        <Image
          source={{ uri: cover_photo }}
          style={{ flex: 1, resizeMode: 'cover' }}
        />
      )}
    </TouchableOpacity>
    // </View>
  );
};
