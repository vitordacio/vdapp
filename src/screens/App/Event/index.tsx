import { Text } from '@components/Text';
import LottieView from 'lottie-react-native';
import { AppView, View } from '@components/View';
import { CoverPhoto } from '@components/CoverPhoto';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { IEvent } from '@interfaces/event';
import { eventService } from '@services/Event';
import assets from '@assets/index';
import { formatTimeRange } from '@utils/formaters';
import { Picture } from '@components/Picture';
import { Button } from '@components/Button';
import { participationService } from '@services/Participation';
import { Pressable } from '@components/Pressable';
import useMessage from '@contexts/message';
import { Icon } from '@components/Icon';
import { LoadingView } from '@components/View/Loading';
import { EventProps } from '@routes/Event/event.routes';
import { EventTopTabRoutes } from '@routes/Event/EventTopTab';
import styles from './styles';

type ParticipationStatus = {
  participation_id?: string;
  participation_status: IEvent['participation_status'];
  userIn: boolean;
  type: 'blue' | 'red' | 'green' | 'gray' | 'dark_gold';
  icon: 'plus' | 'check' | 'x' | 'minus' | 'chevron';
  title: string;
  buttonTitle: string;
};

const Event: React.FC<EventProps> = ({ navigation, route }) => {
  const { event } = route.params;
  const { throwInfo, throwError } = useMessage();

  const [showLoader, setShowLoader] = useState<boolean>(false);

  const [participationLoader, setParticipationLoader] =
    useState<boolean>(false);
  const [participationStatus, setParticipationStatus] = useState(
    {} as ParticipationStatus,
  );

  const fetchData = async (event_id: string) => {
    setShowLoader(true);

    let dataEvent: IEvent;

    let userIn: boolean = false;
    let title: string = '';
    let type: ParticipationStatus['type'];
    let icon: ParticipationStatus['icon'];
    let buttonTitle: string = '';

    try {
      dataEvent = await eventService.findById(event_id);

      const { participation_status, participation_id } = dataEvent;

      if (participation_status === 'author') title = 'Você é o dono!';
      if (participation_status.startsWith('guest'))
        title = 'Você é um convidado!';
      if (participation_status.startsWith('vip'))
        title = 'Você é um convidado VIP!';
      if (participation_status.startsWith('mod'))
        title = 'Você é um moderador!';

      if (!participation_status) {
        type = 'blue';
        icon = 'plus';
        buttonTitle = 'Solicitar entrada';
      } else if (participation_status === 'user_out') {
        type = 'gray';
        icon = 'x';
        buttonTitle = 'Cancelar solicitação';
      } else if (
        participation_status === 'guest_out' ||
        participation_status === 'vip_out' ||
        participation_status === 'mod_out'
      ) {
        type = 'green';
        icon = 'check';
        buttonTitle = 'Entrar';
      } else {
        type = 'red';
        icon = 'minus';
        buttonTitle = 'Sair do Evento';
        userIn = true;
      }

      const handleParticipationStatus: ParticipationStatus = {
        participation_id,
        participation_status,
        userIn,
        type,
        icon,
        buttonTitle,
        title,
      };

      setParticipationStatus(handleParticipationStatus);
    } catch (error) {
      throwError(error.response.data.message);
    }
    setShowLoader(false);
  };

  const handleParticipation = async () => {
    setParticipationLoader(true);

    try {
      let message = '';
      const { participation_status } = participationStatus;

      if (!participation_status) {
        await participationService.requestByUser(event.id_event);
        message = 'Solicitação enviada com sucesso';
      } else if (
        participation_status === 'guest_out' ||
        participation_status === 'vip_out' ||
        participation_status === 'mod_out'
      ) {
        await participationService.inviteResponse(event.id_event);
        message = 'Convite aceito com sucesso';
      } else {
        await participationService.deleteParticipation(
          participationStatus.participation_id,
        );
        message = 'Solicitação cancelada com sucesso';
      }

      throwInfo(message);
      setParticipationLoader(false);
      fetchData(event.id_event);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  // React.useLayoutEffect(() => {
  //   const type = event.type.name;
  //   let title: string;
  //   if (type === 'auditorium') title = 'Apresentação';
  //   if (type === 'beach') title = 'Praia';
  //   if (type === 'birthday') title = 'Aniversário';
  //   if (type === 'boat') title = 'Barco';
  //   if (type === 'culinary') title = 'Culinária';
  //   if (type === 'exercise') title = 'Exercício Físico';
  //   if (type === 'fishing') title = 'Pesca';
  //   if (type === 'games') title = 'Jogos';
  //   if (type === 'meeting') title = 'Reunião';
  //   if (type === 'moon') title = 'Lual';
  //   if (type === 'nature') title = 'Natureza';
  //   if (type === 'party') title = 'Festa';
  //   if (type === 'pool') title = 'Piscina';
  //   if (type === 'table') title = 'Tomar Uma';

  //   navigation.setOptions({
  //     title,
  //   });
  // }, [event.type_id]);

  useEffect(() => {
    fetchData(event.id_event);
  }, []);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {showLoader ? (
          <LoadingView />
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
                      <Text
                        style={[styles.text_default_color, styles.text_large]}
                      >
                        {event.name || '--'}
                      </Text>
                    </View>
                    <View style={styles.data_text}>
                      <Icon name="location" />

                      <Text
                        style={[styles.text_default_color, styles.text_medium]}
                      >
                        {event.location || '--'}
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
                        ) || '--'}
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
                          {event.author.username || ''}
                        </Text>
                        <Text
                          style={[styles.text_gray_color, styles.text_medium]}
                        >
                          {event.author.name || ''}
                        </Text>
                      </View>
                    </View>

                    {[
                      'author',
                      'user_in',
                      'guest_in',
                      'vip_in',
                      'mod_in',
                    ].includes(participationStatus.participation_status) && (
                      <Button
                        style={{ width: 40 }}
                        onPress={() => navigation.navigate('Inbox')}
                        icon="inbox"
                      />
                    )}

                    <Button
                      style={{ width: 40 }}
                      onPress={() => throwInfo('handle emote')}
                      icon="smile"
                    />

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

                  <View style={styles.container_counts}>
                    <View style={styles.data_counts}>
                      <Icon name="smile" size={24} />
                      <Text
                        style={[styles.text_default_color, styles.text_large]}
                      >
                        {event.emojis_count || 0}
                      </Text>
                    </View>
                    <View style={styles.data_counts}>
                      <Icon name="users" size={24} />
                      <Text
                        style={[styles.text_default_color, styles.text_large]}
                      >
                        {event.participating_count || 0}
                      </Text>
                    </View>
                  </View>
                </View>

                {participationStatus && (
                  <View style={styles.container_participation}>
                    <View style={styles.container_adm}>
                      {['author', 'mod_in'].includes(
                        participationStatus.participation_status,
                      ) && (
                        <>
                          <Button
                            type="dark_gold"
                            icon="chevron"
                            maxWidth={200}
                            iconColor="#FFFFFF"
                            onPress={() => navigation.push('EventRequests')}
                            title="Solicitações"
                          />
                          <Button
                            type="dark_gold"
                            icon="chevron"
                            maxWidth={200}
                            iconColor="#FFFFFF"
                            onPress={() => navigation.push('EventInvite')}
                            title="Convidar"
                          />
                          <Button
                            type="dark_gold"
                            icon="chevron"
                            maxWidth={200}
                            iconColor="#FFFFFF"
                            onPress={() => navigation.push('EventManage')}
                            title="Gerenciar"
                          />
                        </>
                      )}
                    </View>

                    {participationStatus.title && (
                      <Text
                        style={[
                          styles.text_default_color,
                          styles.text_extra_large,
                        ]}
                      >
                        {participationStatus.title}
                      </Text>
                    )}

                    {participationStatus.participation_status !== 'author' && (
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
                )}

                <View style={styles.container_footer}>
                  {participationStatus && (
                    <Text
                      style={[
                        styles.text_gray_color,
                        styles.text_medium,
                        { textAlign: 'right' },
                      ]}
                    >
                      {participationStatus.userIn
                        ? 'Você está participando'
                        : 'Você não está participando'}
                    </Text>
                  )}

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
    </AppView>
  );
};

export default Event;
