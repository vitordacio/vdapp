import { Text } from '@components/Text';
import LottieView from 'lottie-react-native';
import { AppView, View } from '@components/View';
import { CoverPhoto } from '@components/CoverPhoto';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import assets from '@assets/index';
import { formatTimeRange } from '@utils/formaters';
import { Picture } from '@components/Picture';
import { Button } from '@components/Button';
import { participationService } from '@services/Participation';
import { EventTopTabRoutes } from '@routes/event.routes';
import useEvent from '@contexts/event';
import { Pressable } from '@components/Pressable';
import useMessage from '@contexts/message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@components/Icon';
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

type EventProps = NativeStackScreenProps<ParamListBase> & {
  paramEvent: IEvent;
};

const Event: React.FC<EventProps> = ({ navigation, paramEvent }) => {
  const { throwInfo, throwError } = useMessage();
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
      throwError(error.response.data.message);
    }
    setShowLoader(false);
    return dataEvent
      ? setEvent(dataEvent)
      : throwError('Ops! Algo deu errado, tente novamente mais tarde');
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
      throwError(error.response.data.message);
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
                          style={styles.status_animation}
                          source={assets.ongoing}
                          autoPlay
                          loop
                        />
                      </View>
                    </>
                  )}
                  <View style={styles.container_event}>
                    <View style={styles.data_text}>
                      <Icon name={event.type.name} />
                      {/* <Image
                        style={styles.icon}
                        source={assetMapping[event.type.name]}
                        resizeMode="contain"
                        tintColor="#fff"
                      /> */}
                      <Text
                        style={[styles.text_default_color, styles.text_large]}
                      >
                        {event.name}
                      </Text>
                    </View>
                    <View style={styles.data_text}>
                      <Icon name="location" />

                      <Text
                        style={[styles.text_default_color, styles.text_medium]}
                      >
                        {event.location}
                      </Text>
                    </View>
                    <View style={styles.data_text}>
                      <Icon name="clock" />

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
                      <Icon name="attach" />

                      <Text
                        style={[styles.text_gray_color, styles.text_medium]}
                      >
                        {event.additional || '--'}
                      </Text>
                    </View>
                    <View style={styles.data_text}>
                      <Icon name="drink" />

                      <Text
                        style={[styles.text_gray_color, styles.text_medium]}
                      >
                        {event.drink_preferences || '--'}
                      </Text>
                    </View>
                    <View style={styles.data_text}>
                      <Icon name="coin" />

                      <Text
                        style={[styles.text_gray_color, styles.text_medium]}
                      >
                        {event.min_amount || '0'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.data_footer}>
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

                    <Button
                      style={{ width: 160 }}
                      onPress={
                        event.address
                          ? () =>
                              navigation.push('Map', { address: event.address })
                          : () =>
                              throwInfo(
                                'O evento não possui localização cadastrada',
                              )
                      }
                      title="Ver no mapa"
                      icon="map"
                      iconSize={22}
                      disabled={!event.address_id}
                    />
                  </View>
                </View>
                <View style={styles.container_participation}>
                  <View style={styles.container_buttons}>
                    <Button
                      style={{ width: 40 }}
                      onPress={() => throwInfo('handle emote')}
                      icon="smile"
                    />

                    {[
                      'author',
                      'user_in',
                      'guest_in',
                      'vip_in',
                      'mod_in',
                    ].includes(event.participation_status) && (
                      <Button
                        style={{ width: 40 }}
                        onPress={() => navigation.navigate('Inbox')}
                        icon="inbox"
                      />
                    )}

                    {['author', 'mod_in'].includes(
                      event.participation_status,
                    ) && (
                      <>
                        <Button
                          type="dark_gold"
                          icon="chevron_right"
                          style={{ maxWidth: 200 }}
                          iconColor="#FFFFFF"
                          onPress={() =>
                            navigation.push('EventInvite', { event })
                          }
                          title="Convidar"
                        />
                        <Button
                          type="dark_gold"
                          icon="chevron_right"
                          style={{ maxWidth: 200 }}
                          iconColor="#FFFFFF"
                          onPress={() =>
                            navigation.push('EventManage', { event })
                          }
                          title="Gerenciar"
                        />
                      </>
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

                  <Pressable
                    onPress={() =>
                      throwInfo(
                        `O evento é ${event.private ? 'privado' : 'público'}.`,
                      )
                    }
                  >
                    <Icon name={event.private ? 'lock' : 'unlock'} size={19} />
                  </Pressable>
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
