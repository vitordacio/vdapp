import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { PictureCard } from '@components/Profile/PictureCard';
import styles from './styles';

const CardEmoji = ({ emoji, navigation }) => {
  const { username, name } = emoji.user;
  // const handleUser = async () => {};

  return (
    <>
      {emoji && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('User', { user: emoji.user })}
        >
          <PictureCard />
          <View style={styles.data}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardEmoji;
