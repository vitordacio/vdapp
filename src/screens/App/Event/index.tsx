import { Text } from '@components/Text';
import LottieView from 'lottie-react-native';
import { AppView, View } from '@components/View';
import { ParamListBase, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CoverPhoto } from '@components/CoverPhoto';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Image,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
// import { UserTopTabRoutes } from '@routes/user.routes';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import assets from '@assets/index';
import { formatTimeRange } from '@utils/formaters';
import { Picture } from '@components/Picture';
import styles from './styles';

const assetMapping: Record<string, ImageSourcePropType> = {
  auditorium: assets.auditorium,
  beach: assets.beach,
  birthday: assets.birthday,
  boat: assets.boat,
  culinary: assets.culinary,
  exercise: assets.exercise,
  fishing: assets.fishing,
  games: assets.games,
  meeting: assets.meeting,
  moon: assets.moon,
  nature: assets.nature,
  party: assets.party,
  pool: assets.pool,
  table: assets.table,
};

type EventParam = ParamListBase & {
  event: IEvent;
};

const Event: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const route = useRoute();
  const { event: paramEvent } = route.params as EventParam;

  const [event, setEvent] = useState<IEvent>();
  const [responseError, setResponseError] = useState<string>();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canSeeContent, setCanSeeContent] = useState<boolean>();

  const fetchData = async () => {
    setShowLoader(true);
    let currentEvent: IEvent;

    try {
      currentEvent = await eventService.findById(paramEvent.id_event);

      setCanSeeContent(!currentEvent.private);
      setEvent(currentEvent);
      setShowLoader(false);
    } catch (error) {
      setResponseError(error.response.data.message);
    }
  };

  React.useLayoutEffect(() => {
    const type = paramEvent.type.name;
    let title: string;
    if (type === 'auditorium') title = 'Apresentação';
    if (type === 'beach') title = 'Praia';
    if (type === 'birthday') title = 'Aniversário';
    if (type === 'boat') title = 'Barco';
    if (type === 'culinary') title = 'Culinária';
    if (type === 'exercise') title = 'Exercício Físico';
    if (type === 'fishing') title = 'Pesca';
    if (type === 'games') title = 'Jogos';
    if (type === 'meeting') title = 'Reunião';
    if (type === 'moon') title = 'Lual';
    if (type === 'nature') title = 'Natureza';
    if (type === 'party') title = 'Festa';
    if (type === 'pool') title = 'Piscina';
    if (type === 'table') title = 'Tomar Uma';

    navigation.setOptions({
      title,
    });
  }, [navigation, paramEvent.type_id]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {showLoader ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {responseError && <Text style={styles.error}>{responseError}</Text>}
            {event && (
              <>
                <View style={styles.container}>
                  <View style={styles.cover_photo}>
                    {event.cover_photo && (
                      <CoverPhoto
                        cover_photo={event.cover_photo}
                        style={styles.cover_photo}
                      />
                    )}
                  </View>
                  <View style={styles.container_data}>
                    {event.status === 'ongoing' && (
                      <>
                        <View style={styles.status}>
                          <Text style={styles.status_message}>
                            Acontecendo agora!
                          </Text>
                          <LottieView
                            style={styles.icon}
                            source={assets.ongoing}
                            autoPlay
                            loop
                          />
                        </View>
                      </>
                    )}
                    <View style={styles.container_event}>
                      <View style={styles.data_text}>
                        <Image
                          style={styles.icon}
                          source={assetMapping[event.type.name]}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_default_color, styles.text_large]}
                        >
                          {event.name}
                        </Text>
                      </View>
                      <View style={styles.data_text}>
                        <ImageBackground
                          style={styles.icon}
                          source={assets.location}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[
                            styles.text_default_color,
                            styles.text_medium,
                          ]}
                        >
                          {event.location}
                        </Text>
                      </View>
                      <View style={styles.data_text}>
                        <ImageBackground
                          style={styles.icon}
                          source={assets.clock}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[
                            styles.text_default_color,
                            styles.text_medium,
                          ]}
                        >
                          {formatTimeRange(
                            event.date,
                            event.time,
                            event.finish_date,
                            event.finish_time,
                            event.author.locale,
                          )}
                        </Text>
                      </View>
                      <View style={styles.data_text}>
                        <ImageBackground
                          style={styles.icon}
                          source={assets.attach}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_gray_color, styles.text_medium]}
                        >
                          {event.additional || '--'}
                        </Text>
                      </View>
                      <View style={styles.data_text}>
                        <ImageBackground
                          style={styles.icon}
                          source={assets.drink}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_gray_color, styles.text_medium]}
                        >
                          {event.drink_preferences || '--'}
                        </Text>
                      </View>
                      <View style={styles.data_text}>
                        <ImageBackground
                          style={styles.icon}
                          source={assets.coin}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_gray_color, styles.text_medium]}
                        >
                          {event.min_amount || '0'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.container_author}>
                      <Picture card={true} picture={event.author.picture} />
                      <View style={styles.data_author}>
                        <Text
                          style={[
                            styles.text_default_color,
                            styles.text_medium,
                          ]}
                        >
                          {event.author.username}
                        </Text>
                        <Text
                          style={[styles.text_gray_color, styles.text_medium]}
                        >
                          {event.author.name}
                        </Text>
                      </View>
                    </View>

                    {/* <View style={styles.container_counts}>
                      <View style={styles.data_counts}>
                        <ImageBackground
                          style={styles.count}
                          source={assets.smile}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_default_color, styles.text_large]}
                        >
                          {event.emojis_count}
                        </Text>
                      </View>

                      <View style={styles.data_counts}>
                        <ImageBackground
                          style={styles.count}
                          source={assets.users}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_default_color, styles.text_large]}
                        >
                          {event.participating_count}
                        </Text>
                      </View>
                    </View> */}
                  </View>
                </View>

                <View style={styles.container_actions}>
                  <View style={styles.container_counts}>
                    <View style={styles.counts}>
                      <Text
                        style={[
                          styles.text_default_color,
                          styles.text_extra_large,
                        ]}
                      >
                        {event.participating_count}
                      </Text>

                      <View style={styles.counts_description}>
                        <ImageBackground
                          style={styles.icon_count}
                          source={assets.users}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_default_color, styles.text_large]}
                        >
                          {event.participating_count <= 1
                            ? 'Participante'
                            : 'Participantes'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.line_y} />

                    <View style={styles.counts}>
                      <Text
                        style={[
                          styles.text_default_color,
                          styles.text_extra_large,
                        ]}
                      >
                        {event.emojis_count}
                      </Text>

                      <View style={styles.counts_description}>
                        <ImageBackground
                          style={styles.icon_count}
                          source={assets.smile}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                        <Text
                          style={[styles.text_default_color, styles.text_large]}
                        >
                          {event.emojis_count <= 1 ? 'Emote' : 'Emotes'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ minHeight: 500 }}>
                  {/* <UserTopTabRoutes /> */}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </AppView>
  );
};

export default Event;
