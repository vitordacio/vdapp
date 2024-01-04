import React from 'react';
import { View } from '@components/View';
import { Text } from '@components/Text';
import { IReact } from '@interfaces/react';
import { formatDate, formatTimeRange } from '@utils/formaters';
import { LineX } from '@components/Line';
import { Pressable } from '@components/Pressable';
import { Icon } from '@components/Icon';
import { Picture } from '@components/Picture';
import { AppProps } from '@routes/App/app.routes';
import { IUser } from '@interfaces/user';
import { IEvent } from '@interfaces/event';
import { Button } from '@components/Button';
import styles from './styles';

const CardReact: React.FC<
  AppProps & { react: IReact; user: IUser; event?: IEvent }
> = ({ react, navigation, route, user, event }) => {
  const { user: self } = route.params;
  const { type, emoji, message } = react;

  const onPress = () => {
    if (type === 'user') {
      if (self.id_user === user.id_user) {
        navigation.navigate('User');
      } else {
        route.params.user_profile = user;
        navigation.push('Profile');
      }
    } else {
      route.params.event = event;
      navigation.push('Event');
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

            {type === 'user' && user && (
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

            {type === 'event' && event && (
              <View style={styles.container_event}>
                {event.name && (
                  <View style={styles.data_text}>
                    {event.type && <Icon name={event.type.name} />}
                    <Text
                      style={[styles.text_default_color, styles.text_large]}
                    >
                      {event.name}
                    </Text>
                  </View>
                )}
                {event.location && (
                  <View style={styles.data_text}>
                    <Icon name="location" />
                    <Text
                      style={[styles.text_default_color, styles.text_medium]}
                    >
                      {event.location}
                    </Text>
                  </View>
                )}
                {event.start_time && event.finish_time && (
                  <View style={styles.data_text}>
                    <Icon name="clock" />
                    <Text
                      style={[styles.text_default_color, styles.text_medium]}
                    >
                      {formatTimeRange(
                        new Date(event.start_time),
                        new Date(event.finish_time),
                        self.locale,
                      )}
                    </Text>
                  </View>
                )}

                <LineX style={{ marginTop: 8 }} />

                <View style={styles.container_counts}>
                  <View style={styles.data_counts}>
                    <Icon name="smile" />
                    <Text
                      style={[styles.text_default_color, styles.text_medium]}
                    >
                      {event.reacts_count}
                    </Text>
                  </View>
                  <View style={styles.data_counts}>
                    <Icon name="users" />
                    <Text
                      style={[styles.text_default_color, styles.text_medium]}
                    >
                      {event.participating_count}
                    </Text>
                  </View>
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
