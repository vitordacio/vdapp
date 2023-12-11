import { Text } from '@components/Text';
import LottieView from 'lottie-react-native';
import { AppView, View } from '@components/View';
import { CoverPhoto } from '@components/CoverPhoto';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Image,
  ImageSourcePropType,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import assets from '@assets/index';
import { formatTimeRange } from '@utils/formaters';
import { Picture } from '@components/Picture';
import { Button } from '@components/Button';
import colors from '@styles/colors';
import { participationService } from '@services/Participation';
import Feather from 'react-native-vector-icons/Feather';
import { EventTopTabRoutes } from '@routes/event.routes';
import useEvent from '@contexts/event';
import useMessage from '@contexts/message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { ViewPrivate } from './ViewPrivate';
import styles from './styles';

type ParticipationStatus = {
  participation_status: IEvent['participation_status'];
  type: 'blue' | 'red' | 'green' | 'gray' | 'dark_gold';
  icon:
    | 'plus-circle'
    | 'check-circle'
    | 'x-circle'
    | 'minus-circle'
    | 'chevron-right';
  buttonTitle: string;
};

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

type EventProps = NativeStackScreenProps<ParamListBase> & {
  paramEvent: IEvent;
};

const Event: React.FC<EventProps> = ({ navigation, paramEvent }) => {
  const { setMessage, setMessageType, handleEntering } = useMessage();
  const { event, setEvent } = useEvent();

  const [showLoader, setShowLoader] = useState<boolean>(false);

  const [showPrivate, setShowPrivate] = useState<boolean>(false);
  const [userIn, setUserIn] = useState<boolean>(false);

  const [participationLoader, setParticipationLoader] =
    useState<boolean>(false);
  const [participationTitle, setParticipationTitle] = useState('');
  const [participationStatus, setParticipationStatus] = useState(
    {} as ParticipationStatus,
  );

  const fetchData = async (event_id: string) => {
    let dataEvent: IEvent;
    let handleIn: boolean = false;

    let title: string = '';
    let type: ParticipationStatus['type'];
    let icon: ParticipationStatus['icon'];
    let buttonTitle: string = '';

    setShowLoader(true);
    try {
      dataEvent = await eventService.findById(event_id);

      const { participation_status } = dataEvent;

      if (participation_status === 'author') title = 'Você é o dono!';
      if (participation_status.startsWith('guest'))
        title = 'Você é um convidado!';
      if (participation_status.startsWith('vip'))
        title = 'Você é um convidado VIP!';
      if (participation_status.startsWith('mod'))
        title = 'Você é um moderador!';

      if (!participation_status) {
        type = 'blue';
        icon = 'plus-circle';
        buttonTitle = 'Solicitar entrada';
      } else if (participation_status === 'user_out') {
        type = 'gray';
        icon = 'x-circle';
        buttonTitle = 'Cancelar solicitação';
      } else if (
        participation_status === 'guest_out' ||
        participation_status === 'vip_out' ||
        participation_status === 'mod_out'
      ) {
        type = 'green';
        icon = 'check-circle';
        buttonTitle = 'Entrar';
      } else {
        type = 'red';
        icon = 'minus-circle';
        buttonTitle = 'Sair do Evento';
        handleIn = true;
      }

      const handleParticipationStatus: ParticipationStatus = {
        participation_status,
        type,
        icon,
        buttonTitle,
      };

      setUserIn(handleIn);
      setParticipationTitle(title);
      setParticipationStatus(handleParticipationStatus);
    } catch (error) {
      setMessageType('alert');
      setMessage(error.response.data.message);
    }
    setShowLoader(false);
    return dataEvent ? setEvent(dataEvent) : handleEntering();
  };

  const handleParticipation = async () => {
    setParticipationLoader(true);

    try {
      const { participation_status } = participationStatus;

      if (!participation_status) {
        await participationService.requestByUser(event.id_event);
      } else if (
        participation_status === 'guest_out' ||
        participation_status === 'vip_out' ||
        participation_status === 'mod_out'
      ) {
        await participationService.inviteResponse(event.id_event);
      } else {
        await participationService.deleteParticipation(event.participation_id);
      }

      setParticipationLoader(false);
      fetchData(paramEvent.id_event);
    } catch (error) {
      setMessageType('alert');
      setMessage(error.response.data.message);
      handleEntering();
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
  }, [paramEvent.type_id]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData(paramEvent.id_event);
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
            {event && (
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
                        style={[styles.text_default_color, styles.text_medium]}
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
                        style={[styles.text_default_color, styles.text_medium]}
                      >
                        {formatTimeRange(
                          new Date(event.start_time),
                          new Date(event.finish_time),
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
                        style={[styles.text_default_color, styles.text_medium]}
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
                </View>

                <View style={styles.container_participation}>
                  <View style={styles.container_buttons}>
                    <Button
                      style={{ width: 40 }}
                      onPress={() => console.log('handle emote')}
                      svg="smile"
                    />

                    <Button
                      style={{ width: 160 }}
                      svgSize={22}
                      onPress={() => console.log('handle map')}
                      title="Ver no mapa"
                      svg="map"
                    />

                    <Button
                      style={{ width: 40 }}
                      onPress={() => navigation.navigate('Inbox')}
                      svg="inbox"
                    />

                    {(event.participation_status === 'author' ||
                      event.participation_status === 'mod_in') && (
                      <Button
                        type="dark_gold"
                        icon="chevron-right"
                        style={{ maxWidth: 200 }}
                        iconColor="#FFFFFF"
                        onPress={() =>
                          navigation.push('ManageEvent', { event })
                        }
                        title="Gerenciar"
                      />
                    )}
                  </View>

                  {participationTitle && (
                    <Text
                      style={[
                        styles.text_default_color,
                        styles.text_extra_large,
                      ]}
                    >
                      {participationTitle}
                    </Text>
                  )}

                  {participationStatus &&
                    participationStatus.participation_status !== 'author' && (
                      <Button
                        type={participationStatus.type}
                        icon={participationStatus.icon}
                        style={{ maxWidth: 200 }}
                        iconSize={22}
                        iconColor="#FFFFFF"
                        onPress={handleParticipation}
                        title={participationStatus.buttonTitle}
                        loading={participationLoader}
                      />
                    )}
                </View>

                <View style={styles.container_footer}>
                  <Text
                    style={[
                      styles.text_gray_color,
                      styles.text_medium,
                      { textAlign: 'right' },
                    ]}
                  >
                    {userIn
                      ? 'Você está participando'
                      : 'Você não está participando'}
                  </Text>

                  <TouchableOpacity onPress={() => setShowPrivate(true)}>
                    <Feather
                      name={event.private ? 'lock' : 'unlock'}
                      size={19}
                      color={`${colors.TEXT_DEFAULT}`}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}
        <EventTopTabRoutes />
      </ScrollView>
      {showPrivate && (
        <ViewPrivate setConfirm={setShowPrivate} is_private={event.private} />
      )}
    </AppView>
  );
};

export default Event;
