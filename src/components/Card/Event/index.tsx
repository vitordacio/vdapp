import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from '@components/View';
import { Text } from '@components/Text';
import assets from '@assets/index';
import { Image } from 'react-native';
import { IEvent, IEventPerformer } from '@interfaces/event';
import { formatTimeRange } from '@utils/formaters';
import { LineX } from '@components/Line';
import { Pressable } from '@components/Pressable';
import { Icon } from '@components/Icon';
import { Picture } from '@components/Picture';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

type CardEventProps = AppProps & {
  event: IEvent;
  hideAuthor?: boolean;
};

const CardEvent: React.FC<CardEventProps> = ({
  event,
  navigation,
  route,
  hideAuthor,
}) => {
  const { user } = route.params;

  const handleProfilePerformer = (performer: IEventPerformer) => {
    if (performer.user) {
      route.params.user_profile = performer.user;
      navigation.push('Profile');
    }
  };

  const onPress = () => {
    route.params.event = event;
    return navigation.push('Event');
  };

  return (
    <>
      {event && (
        <Pressable
          style={[styles.container, event.type.verified && styles.verified]}
          onPress={onPress}
        >
          {event.cover_photo && (
            <Image
              source={{ uri: event.cover_photo }}
              style={styles.cover_photo}
              resizeMode="cover"
            />
          )}
          <View style={styles.container_data}>
            {event.event_status === 'ongoing' && (
              <LottieView
                style={styles.status}
                source={assets.ongoing}
                autoPlay
                loop
              />
            )}

            <View style={styles.container_event}>
              <View style={styles.event_data}>
                <Icon
                  name={event.type.name}
                  tintColor={event.type.verified && '#F2C94D'}
                />
                <Text
                  style={[
                    styles.data_text,
                    event.type.verified
                      ? styles.text_gold_color
                      : styles.text_default_color,
                    styles.text_large,
                  ]}
                >
                  {event.name || '--'}
                </Text>
              </View>

              <View style={styles.event_data}>
                <Icon name="location" />

                <Text
                  style={[
                    styles.data_text,
                    styles.text_default_color,
                    styles.text_large,
                  ]}
                >
                  {event.location || '--'}
                </Text>
              </View>

              <View style={styles.event_data}>
                <Icon name="clock" />

                <Text
                  style={[
                    styles.data_text,
                    styles.text_default_color,
                    styles.text_large,
                  ]}
                >
                  {formatTimeRange(
                    new Date(event.start_time),
                    new Date(event.finish_time),
                    user.locale,
                  ) || '--'}
                </Text>
              </View>

              <View style={styles.event_data}>
                <Icon name="attach" />

                <Text
                  style={[
                    styles.data_text,
                    styles.text_default_color,
                    styles.text_medium,
                  ]}
                >
                  {event.additional || '--'}
                </Text>
              </View>

              <View style={styles.event_data}>
                <Icon name="drink" />

                <Text
                  style={[
                    styles.data_text,
                    styles.text_default_color,
                    styles.text_medium,
                  ]}
                >
                  {event.drink_preferences || '--'}
                </Text>
              </View>

              {event.min_amount && (
                <View style={styles.event_data}>
                  <Icon name="coin" />

                  <Text
                    style={[
                      styles.data_text,
                      styles.text_default_color,
                      styles.text_medium,
                    ]}
                  >
                    {event.min_amount}
                  </Text>
                </View>
              )}

              {event.type.verified && (
                <>
                  {event.club_name && (
                    <View style={styles.event_data}>
                      <Icon name="club" />

                      <Text
                        style={[
                          styles.data_text,
                          styles.text_default_color,
                          styles.text_medium,
                        ]}
                      >
                        {event.club_name}
                      </Text>
                    </View>
                  )}

                  {event.ticket_value && (
                    <View style={styles.event_data}>
                      <Icon name="ticket" />

                      <Text
                        style={[
                          styles.data_text,
                          styles.text_default_color,
                          styles.text_medium,
                        ]}
                      >
                        {event.ticket_value}
                      </Text>
                    </View>
                  )}

                  {event.performers.length !== 0 && (
                    <View style={styles.event_data}>
                      <Icon name="mic" style={{ marginRight: 10 }} />
                      {event.performers.map((performer, index) => (
                        <React.Fragment key={performer.id_performer}>
                          {index > 0 && (
                            <Text style={styles.performer_name}>,</Text>
                          )}
                          {performer.user ? (
                            <Pressable
                              onPress={() => handleProfilePerformer(performer)}
                            >
                              <Text
                                style={[
                                  styles.text_link_color,
                                  styles.text_large,
                                ]}
                              >
                                {performer.name}
                              </Text>
                            </Pressable>
                          ) : (
                            <Text
                              style={[
                                styles.text_default_color,
                                styles.text_large,
                              ]}
                            >
                              {performer.name}
                            </Text>
                          )}
                        </React.Fragment>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>

            {event.author && !hideAuthor && (
              <View style={styles.container_author}>
                <Picture card={true} picture={event.author.picture} />
                <View style={styles.data_author}>
                  {event.author.username && (
                    <Text
                      style={[styles.text_default_color, styles.text_medium]}
                    >
                      {event.author.username}
                    </Text>
                  )}

                  {event.author.name && (
                    <Text style={[styles.text_gray_color, styles.text_medium]}>
                      {event.author.name}
                    </Text>
                  )}
                </View>
              </View>
            )}

            <LineX style={{ marginTop: 8 }} />

            <View style={styles.container_counts}>
              <View style={styles.data_counts}>
                <Icon name="smile" />
                <Text style={[styles.text_default_color, styles.text_medium]}>
                  {event.reacts_count}
                </Text>
              </View>
              <View style={styles.data_counts}>
                <Icon name="users" />
                <Text style={[styles.text_default_color, styles.text_medium]}>
                  {event.participating_count}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardEvent;
