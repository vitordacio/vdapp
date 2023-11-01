import { View } from '@components/View';
import { Text } from '@components/Text';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from '@components/Button';
import { PictureCard } from '@components/Profile/PictureCard';
import styles from './styles';

const CardUser = ({ user, navigation }) => {
  const { username, name } = user;
  // const handleUser = async () => {};

  return (
    <>
      {user && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('User', { user })}
        >
          <PictureCard />
          <View style={styles.data}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.name}>{name}</Text>
          </View>
          <Button
            type={!user.friendship ? 'blue' : 'red'}
            icon={!user.friendship ? 'user-plus' : 'user-x'}
            iconSize={30}
            iconColor="#FFFFFF"
            style={styles.friendship}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardUser;
