import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { Picture } from '@components/Picture';
import { IUser } from '@interfaces/user';
import { Pressable } from '@components/Pressable';
import { AppProps } from '@routes/App/app.routes';
import useMessage from '@contexts/message';
import { Icon } from '@components/Icon';
import styles from '../styles';

const CardUserPerformer: React.FC<AppProps & { user: IUser }> = ({
  user,
  navigation,
  route,
}) => {
  const { throwError } = useMessage();
  const { performers } = route.params.event;
  const { username, name, picture } = user;

  const onPress = () => {
    if (performers.some(performer => performer.user_id === user.id_user))
      return throwError('Usuário já é artista no evento');

    route.params.updateEventPerformer = {
      create_data: {
        type: 'user',
        data: user,
      },
    };
    return navigation.push('EventCreatePerformer');
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
          <Icon name="chevron" />
        </Pressable>
      )}
    </>
  );
};

export default CardUserPerformer;
