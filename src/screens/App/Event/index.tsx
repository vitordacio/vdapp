import { Text } from '@components/Text';
import LottieView from 'lottie-react-native';
import { AppView, View } from '@components/View';
import { CoverPhoto } from '@components/CoverPhoto';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { IEvent, IEventPerformer } from '@interfaces/event';
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
import { AppProps } from '@routes/App/app.routes';
import { EventTopTabRoutes } from '@routes/App/Event/EventTopTab';
import { EventPrivateTopTabRoutes } from '@routes/Private/EventPrivateTopTabRoutes';
import { IParticipation } from '@interfaces/participation';
import styles from './styles';
import { ParticipationStatus, eventParticipationHandler } from './handlers';
import NotFoundEvent from './NotFoundEvent';

const Event: React.FC<AppProps> = ({ navigation, route }) => {
  const { event: paramEvent, user: self } = route.params;
  const { throwInfo, throwError } = useMessage();

  const [event, setEvent] = useState<IEvent>();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [participationLoader, setParticipationLoader] =
    useState<boolean>(false);
  const [participationStatus, setParticipationStatus] = useState(
    {} as ParticipationStatus,
  );

  const handleReact = () => {
    if (event.user_react) {
      route.params.react = {
        type: 'event',
        react: event.user_react,
        event,
      };
      navigation.navigate('ReactEventView');
    } else {
      route.params.react = {
        type: 'event',
        event,
      };
      navigation.navigate('React');
    }
  };

  const handleProfilePerformer = (performer: IEventPerformer) => {
    if (performer.user) {
      route.params.user_profile = performer.user;
      navigation.push('Profile');
    }
  };

  const handleMap = () => {
    if (!event.address) throwError('Localização não cadastrada');
  };

  const fetchData = async (event_id: string) => {
    let dataEvent: IEvent;

    try {
      dataEvent = await eventService.findById(event_id);

      setEvent(dataEvent);

      const handleParticipationStatus = eventParticipationHandler({
        participation_id: dataEvent.participation_id,
        participation_status: dataEvent.participation_status,
      });

      setParticipationStatus(handleParticipationStatus);
    } catch (error) {
      throwError(error.response.data.message);
    }
    setShowLoader(false);
  };

  const handleParticipation = async () => {
    setParticipationLoader(true);
    let updatedEvent = event;
    let dataParticipation: IParticipation;
    let status = participationStatus;
    let message = '';

    try {
      if (!status.participation_status) {
        dataParticipation = await participationService.requestByUser(
          event.id_event,
        );

        updatedEvent.event_status = dataParticipation.event_status;
        updatedEvent.participating = dataParticipation.participating;
        updatedEvent.can_see_content = dataParticipation.can_see_content;

        message = 'Solicitação enviada com sucesso';
      } else if (
        ['guest_out', 'vip_out', 'mod_out'].includes(
          status.participation_status,
        )
      ) {
        dataParticipation = await participationService.inviteResponse(
          event.id_event,
        );
        updatedEvent = dataParticipation.event;
        updatedEvent.event_status = dataParticipation.event_status;
        updatedEvent.participating = dataParticipation.participating;
        updatedEvent.can_see_content = dataParticipation.can_see_content;

        message = 'Convite aceito com sucesso';
      } else {
        await participationService.deleteParticipation(status.participation_id);
        if (event.participating) {
          updatedEvent.participating_count -= 1;
          updatedEvent.participating = false;
          if (updatedEvent.private && !event.type.verified)
            updatedEvent.can_see_content = false;

          message = 'Você saiu do evento com sucesso';
        } else {
          message = 'Solicitação cancelada com sucesso';
        }

        status.participation_id = '';
      }

      status = eventParticipationHandler({
        participation_id: dataParticipation?.participation_id || '',
        participation_status: dataParticipation?.participation_status || '',
      });
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (status !== participationStatus) setParticipationStatus(status);
    if (updatedEvent !== event) setEvent(updatedEvent);
    if (message) throwInfo(message);
    setParticipationLoader(false);
  };

  useEffect(() => {
    fetchData(paramEvent.id_event);
  }, [route.params.event]);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {!showLoader ? (
          <>
            {event ? (
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
                  {event.event_status === 'ongoing' && (
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
                          event.author.locale,
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
                                    onPress={() =>
                                      handleProfilePerformer(performer)
                                    }
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
                          style={[
                            styles.text_default_color,
                            styles.text_medium,
                          ]}
                        >
                          {event.author.name || ''}
                        </Text>
                      </View>
                    </View>

                    {(self.id_user === event.author_id ||
                      event.participating) && (
                      <Button
                        style={{ width: 40 }}
                        onPress={() => navigation.navigate('Inbox')}
                        icon="inbox"
                      />
                    )}

                    <Button
                      style={{ width: 40 }}
                      onPress={handleReact}
                      title={event.user_react?.emoji.value}
                      icon={!event.user_react && 'smile'}
                    />

                    {event.can_see_content && (
                      <Button
                        style={{ width: 160 }}
                        onPress={handleMap}
                        title="Ver no mapa"
                        icon="map"
                        iconSize={22}
                        disabled={!event.address_id}
                      />
                    )}
                  </View>

                  <View style={styles.container_counts}>
                    <View style={styles.data_counts}>
                      <Icon name="smile" size={24} />
                      <Text
                        style={[styles.text_default_color, styles.text_large]}
                      >
                        {event.reacts_count || 0}
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
                  <Text style={[styles.text_default_color, styles.text_medium]}>
                    {event.participating
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
            ) : (
              <NotFoundEvent />
            )}

            {event && (
              <View style={{ minHeight: 800 }}>
                {event.can_see_content && (
                  <EventTopTabRoutes navigation={navigation} route={route} />
                )}
                {!event.can_see_content && <EventPrivateTopTabRoutes />}
              </View>
            )}
          </>
        ) : (
          <LoadingView />
        )}
      </ScrollView>
    </AppView>
  );
};

export default Event;
