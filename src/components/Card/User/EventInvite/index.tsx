import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { Picture } from '@components/Picture';
import { IUser } from '@interfaces/user';
import { Pressable } from '@components/Pressable';
import { AppProps } from '@routes/App/app.routes';
import styles from '../styles';

const CardUserEventInvite: React.FC<AppProps & { user: IUser }> = ({
  user,
  navigation,
  route,
}) => {
  const { username, name, picture } = user;

  const onPress = () => {
    route.params.user_invite = user;
    return navigation.push('EventInviteConfirm');
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

export default CardUserEventInvite;
