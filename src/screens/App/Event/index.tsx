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
import { AppProps } from '@routes/App/app.routes';
import { EventTopTabRoutes } from '@routes/App/Event/EventTopTab';
import { IParticipation } from '@interfaces/participation';
import styles from './styles';
import { ParticipationStatus, eventParticipationHandler } from './handlers';
import NotFoundEvent from './NotFoundEvent';

const Event: React.FC<AppProps> = ({ navigation, route }) => {
  const { event, onUpdateEvent } = route.params;
  const { throwInfo, throwError } = useMessage();

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [eventExists, setEventExists] = useState<boolean>(true);
  const [participationLoader, setParticipationLoader] =
    useState<boolean>(false);
  const [participationStatus, setParticipationStatus] = useState(
    {} as ParticipationStatus,
  );

  const fetchData = async (event_id: string) => {
    setShowLoader(true);

    let dataEvent: IEvent;

    try {
      dataEvent = await eventService.findById(event_id);

      const handleParticipationStatus = eventParticipationHandler(
        dataEvent.control,
      );

      setParticipationStatus(handleParticipationStatus);
    } catch (error) {
      throwError(error.response.data.message);
      setEventExists(false);
    }
    setShowLoader(false);
  };

  const handleParticipation = async () => {
    setParticipationLoader(true);

    try {
      const updatedEvent = event;
      let dataParticipation: IParticipation;
      let message = '';

      let status = participationStatus;

      if (!status.participation_status) {
        dataParticipation = await participationService.requestByUser(
          event.id_event,
        );
        message = 'Solicitação enviada com sucesso';
      } else if (
        ['guest_out', 'vip_out', 'mod_out'].includes(
          status.participation_status,
        )
      ) {
        dataParticipation = await participationService.inviteResponse(
          event.id_event,
        );
        message = 'Convite aceito com sucesso';
        updatedEvent.participating_count += 1;
      } else {
        await participationService.deleteParticipation(status.participation_id);
        if (
          ['user_in', 'guest_in', 'vip_in', 'mod_in'].includes(
            status.participation_status,
          )
        ) {
          updatedEvent.participating_count -= 1;
          message = 'Você saiu do evento com sucesso';
        } else {
          message = 'Solicitação cancelada com sucesso';
        }

        status.participation_id = '';
      }

      status.participation_status = dataParticipation
        ? dataParticipation.control.participation_status
        : '';
      status.can_see_content = dataParticipation
        ? dataParticipation.control.can_see_content
        : !event.type.free_access || !event.private;

      status = eventParticipationHandler(status);

      // status = eventParticipationHandler({
      //   participation_status: dataParticipation?.participation_status || '',
      //   participation_id: dataParticipation?.id_participation || '',
      // });

      setParticipationStatus(status);
      if (updatedEvent !== event) onUpdateEvent(updatedEvent);
      throwInfo(message);
      setParticipationLoader(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

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
        {eventExists ? (
          <>
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
                      {participationStatus.status === 'ongoing' && (
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
                            style={[
                              styles.text_default_color,
                              styles.text_large,
                            ]}
                          >
                            {event.name || '--'}
                          </Text>
                        </View>
                        <View style={styles.data_text}>
                          <Icon name="location" />

                          <Text
                            style={[
                              styles.text_default_color,
                              styles.text_medium,
                            ]}
                          >
                            {event.location || '--'}
                          </Text>
                        </View>
                        <View style={styles.data_text}>
                          <Icon name="clock" />

                          <Text
                            style={[
                              styles.text_default_color,
                              styles.text_medium,
                            ]}
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
                              style={[
                                styles.text_gray_color,
                                styles.text_medium,
                              ]}
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
                        ].includes(
                          participationStatus.participation_status,
                        ) && (
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
                                  navigation.push('Map', {
                                    address: event.address,
                                  })
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
                            style={[
                              styles.text_default_color,
                              styles.text_large,
                            ]}
                          >
                            {event.emojis_count || 0}
                          </Text>
                        </View>
                        <View style={styles.data_counts}>
                          <Icon name="users" size={24} />
                          <Text
                            style={[
                              styles.text_default_color,
                              styles.text_large,
                            ]}
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

                        {participationStatus.participation_status !==
                          'author' && (
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
                            `O evento é ${
                              event.private ? 'privado' : 'público'
                            }.`,
                          )
                        }
                      >
                        <Icon
                          name={event.private ? 'lock' : 'unlock'}
                          size={19}
                        />
                      </Pressable>
                    </View>
                  </View>
                )}
              </>
            )}
            <EventTopTabRoutes />
          </>
        ) : (
          <NotFoundEvent />
        )}
      </ScrollView>
    </AppView>
  );
};

export default Event;
