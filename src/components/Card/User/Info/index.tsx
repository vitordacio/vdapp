import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { Picture } from '@components/Picture';
import { IUser } from '@interfaces/user';
import { Pressable } from '@components/Pressable';
import { AppProps } from '@routes/App/app.routes';
import styles from '../styles';

const CardUserInfo: React.FC<AppProps & { user: IUser }> = ({
  user,
  navigation,
  route,
}) => {
  const { user: self } = route.params;
  const { username, name, picture } = user;

  const onPress = () => {
    if (self.id_user === user.id_user) return navigation.navigate('User');

    route.params.user_profile = user;
    return navigation.push('Profile');
  };

  return (
    <>
      {user && (
        <Pressable style={styles.container} onPress={onPress}>
          <Picture card={true} picture={picture} />
          <View style={styles.content}>
            {name && <Text style={styles.name}>{name}</Text>}
            {username && <Text style={styles.username}>@{username}</Text>}
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardUserInfo;
