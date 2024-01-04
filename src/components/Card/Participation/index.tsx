import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from '@components/View';
import { Text } from '@components/Text';
import assets from '@assets/index';
import { Image } from 'react-native';
import { IParticipation } from '@interfaces/participation';
import { formatTimeRange } from '@utils/formaters';
import { LineX } from '@components/Line';
import { Pressable } from '@components/Pressable';
import { Icon } from '@components/Icon';
import { Picture } from '@components/Picture';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

type CardParticipationProps = AppProps & {
  participation: IParticipation;
  hideAuthor?: boolean;
};

const CardParticipation: React.FC<CardParticipationProps> = ({
  participation,
  navigation,
  route,
  hideAuthor,
}) => {
  const { user } = route.params;

  const {
    type,
    cover_photo,
    name,
    location,
    start_time,
    finish_time,
    additional,
    drink_preferences,
    min_amount,
    participating_count,
    reacts_count,
    author,
    event_status,
  } = participation.event;

  let participationType: string;
  if (participation.type.name === 'user') participationType = 'Participante';
  if (participation.type.name === 'guest') participationType = 'Convidado';
  if (participation.type.name === 'vip') participationType = 'Convidado VIP';
  if (participation.type.name === 'mod') participationType = 'Moderador';

  const hours = formatTimeRange(
    new Date(start_time),
    new Date(finish_time),
    user.locale,
  );

  const onPress = () => {
    route.params.event = participation.event;
    return navigation.push('Event');
  };

  return (
    <>
      {participation && participation.event && (
        <Pressable style={styles.container} onPress={onPress}>
          {participationType && (
            <View style={styles.participation}>
              <Text style={[styles.text_gold_color, styles.text_large]}>
                {participationType}
              </Text>
            </View>
          )}
          {cover_photo && (
            <Image
              source={{ uri: cover_photo }}
              style={styles.cover_photo}
              resizeMode="cover"
            />
          )}
          <View style={styles.container_data}>
            {event_status === 'ongoing' && (
              <LottieView
                style={styles.status}
                source={assets.ongoing}
                autoPlay
                loop
              />
            )}

            <View style={styles.container_event}>
              {name && (
                <View style={styles.data_text}>
                  {type && <Icon name={type.name} />}
                  <Text style={[styles.text_default_color, styles.text_large]}>
                    {name}
                  </Text>
                </View>
              )}
              {location && (
                <View style={styles.data_text}>
                  <Icon name="location" />
                  <Text style={[styles.text_default_color, styles.text_medium]}>
                    {location}
                  </Text>
                </View>
              )}
              {hours && (
                <View style={styles.data_text}>
                  <Icon name="clock" />
                  <Text style={[styles.text_default_color, styles.text_medium]}>
                    {hours}
                  </Text>
                </View>
              )}
              {additional && (
                <View style={styles.data_text}>
                  <Icon name="attach" />
                  <Text style={[styles.text_gray_color, styles.text_medium]}>
                    {additional}
                  </Text>
                </View>
              )}
              {drink_preferences && (
                <View style={styles.data_text}>
                  <Icon name="drink" />
                  <Text style={[styles.text_gray_color, styles.text_medium]}>
                    {drink_preferences}
                  </Text>
                </View>
              )}
              {min_amount && (
                <View style={styles.data_text}>
                  <Icon name="coin" />
                  <Text style={[styles.text_gray_color, styles.text_medium]}>
                    {min_amount}
                  </Text>
                </View>
              )}
            </View>

            {author && !hideAuthor && (
              <View style={styles.container_author}>
                <Picture card={true} picture={author.picture} />
                <View style={styles.data_author}>
                  {author.username && (
                    <Text
                      style={[styles.text_default_color, styles.text_medium]}
                    >
                      {author.username}
                    </Text>
                  )}

                  {author.name && (
                    <Text style={[styles.text_gray_color, styles.text_medium]}>
                      {author.name}
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
                  {reacts_count}
                </Text>
              </View>
              <View style={styles.data_counts}>
                <Icon name="users" />
                <Text style={[styles.text_default_color, styles.text_medium]}>
                  {participating_count}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardParticipation;
