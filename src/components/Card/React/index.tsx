import React from 'react';
import { View } from '@components/View';
import { Text } from '@components/Text';
import { IReact } from '@interfaces/react';
import { formatDate } from '@utils/formaters';
import { Pressable } from '@components/Pressable';
import { Picture } from '@components/Picture';
import { AppProps } from '@routes/App/app.routes';
import { Button } from '@components/Button';
import { IUser } from '@interfaces/user';
import styles from './styles';

const CardReact: React.FC<AppProps & { react: IReact; user: IUser }> = ({
  react,
  navigation,
  route,
  user,
}) => {
  const { user: self } = route.params;
  const { emoji, message } = react;

  const onPress = () => {
    if (self.id_user === user.id_user) {
      navigation.navigate('User');
    } else {
      route.params.user_profile = user;
      navigation.push('Profile');
    }
  };

  return (
    <>
      {react && (
        <Pressable style={styles.container} onPress={onPress}>
          <View style={styles.container}>
            <View style={styles.container_emoji}>
              <Button title={emoji.value} maxWidth={40} />
            </View>

            {message && <Text style={styles.message}>{message}</Text>}

            {user && (
              <View style={styles.container_author}>
                <Picture card={true} picture={user.picture} />
                <View style={styles.data_author}>
                  {user.username && (
                    <Text
                      style={[styles.text_default_color, styles.text_medium]}
                    >
                      {user.username}
                    </Text>
                  )}

                  {user.name && (
                    <Text style={[styles.text_gray_color, styles.text_medium]}>
                      {user.name}
                    </Text>
                  )}
                </View>
              </View>
            )}

            <Text style={styles.created_at}>
              {formatDate(react.created_at, self.locale)}
            </Text>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardReact;
