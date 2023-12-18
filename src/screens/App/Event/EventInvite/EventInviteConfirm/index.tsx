import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import CardUserInfo from '@components/Card/User/Info';
import { Button } from '@components/Button';
import { LineX } from '@components/Line';
import useMessage from '@contexts/message';
import { participationService } from '@services/Participation';
import { Loading } from '@components/View/Loading';
import { IParticipation, IParticipationType } from '@interfaces/participation';
import { EventAndOnUpdateProps } from '@routes/event.routes';
import styles from './styles';

const EventInviteConfirm: React.FC<EventAndOnUpdateProps> = ({ route }) => {
  const { user, event } = route.params;

  const { throwInfo, throwError } = useMessage();

  const [inviteTypes, setInviteTypes] = useState<IParticipationType[]>();
  const [participation, setParticipation] = useState<IParticipation>();

  const [loadingContent, setLoadingContent] = useState<boolean>(true);
  const [loadingTypes, setLoadingTypes] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedInviteType, setSelectedInviteType] =
    useState<IParticipationType>();

  const handleInvite = async (submit: 'invite' | 'accept' | 'promote') => {
    let info: string;
    setLoading(true);
    try {
      const newParticipation = await participationService.inviteRequest({
        event_id: event.id_event,
        type_id: selectedInviteType.id_participation_type,
        user_id: user.id_user,
      });

      if (submit === 'invite') info = `${user.name} convidado com sucesso!`;
      if (submit === 'accept')
        info = `${user.name} aceito e promovido com sucesso!`;
      if (submit === 'promote') info = `${user.name} promovido com sucesso!`;

      throwInfo(info);
      setParticipation(newParticipation);
    } catch (error) {
      throwError(error.response.data.message);
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await participationService.deleteParticipation(
        participation.id_participation,
      );

      const newParticipation = participation;

      newParticipation.id_participation = '';
      newParticipation.participation_status = '';
      setParticipation(newParticipation);
      throwInfo(`O convite foi cancelado com sucesso!`);
    } catch (error) {
      throwError(error.response.data.message);
    }

    setLoading(false);
  };

  const fetchInviteTypes = async () => {
    try {
      const types: IParticipationType[] = [];
      const indexTypes = await participationService.findParticipationTypes();

      indexTypes.forEach(type => {
        if (type.name === 'user') return;
        const setType: IParticipationType = {
          id_participation_type: type.id_participation_type,
          name: type.name,
        };

        if (setType.name === 'guest') {
          setType.inviteButtonTitle = 'Convidado';
          setType.inviteDescription = 'convidado';
        }
        if (setType.name === 'mod') {
          setType.inviteButtonTitle = 'Moderador';
          setType.inviteDescription = 'moderador';
        }
        if (setType.name === 'vip') {
          setType.inviteButtonTitle = 'VIP';
          setType.inviteDescription = 'VIP';
        }

        types.push(setType);
      });

      setInviteTypes(types);
      setSelectedInviteType(types.find(type => type.name === 'guest'));
      setLoadingTypes(false);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const fetchContent = async () => {
    let userParticipation: IParticipation;

    try {
      userParticipation = await participationService.findByEventAndUser({
        event_id: event.id_event,
        user_id: user.id_user,
      });
    } catch (error) {
      throwError(error.response.data.message);
    }

    setParticipation(userParticipation);
    setLoadingContent(false);
  };

  useEffect(() => {
    if (!inviteTypes) fetchInviteTypes();

    fetchContent();
  }, []);
  // }, [handleEntering]);

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tipo de convite</Text>
        <Text style={[styles.text, styles.description]}>
          Escolha como será a participação do usuário no evento
        </Text>
        <View style={styles.user}>
          <CardUserInfo user={user} />
        </View>

        <View style={styles.content}>
          {loadingContent && <Loading size={48} />}

          {!loadingContent &&
            !['guest_out', 'mod_out', 'vip_out'].includes(
              participation.participation_status,
            ) && (
              <View style={styles.options}>
                {loadingTypes && <Loading size={28} />}
                {!loadingTypes &&
                  inviteTypes &&
                  inviteTypes.map(type => (
                    <Button
                      key={type.id_participation_type}
                      type="dark_gold"
                      style={{ maxWidth: 200 }}
                      onPress={() => setSelectedInviteType(type)}
                      title={type.inviteButtonTitle}
                      selected={selectedInviteType === type}
                    />
                  ))}
              </View>
            )}

          {!loadingContent && !participation.participation_status && (
            <View style={styles.submit}>
              <Text style={[styles.text, styles.description]}>
                Pressione o botão abaixo para confirmar o convite de{' '}
                <Text style={styles.color_blue}>{user.name}</Text> como{' '}
                <Text style={styles.color_blue}>
                  {selectedInviteType.inviteDescription || 'convidado'}
                </Text>
                !
              </Text>
              <View style={styles.mod_view}>
                {selectedInviteType.name === 'mod' && (
                  <Text style={styles.mod}>
                    * Moderador recebe todos os privilégios de administração,
                    exceto a exclusão do evento
                  </Text>
                )}
              </View>
              <Button
                type="blue"
                onPress={() => handleInvite('invite')}
                title="Confirmar Convite"
                loading={loading}
                maxWidth={250}
              />
            </View>
          )}
          {!loadingContent &&
            ['guest_out', 'mod_out', 'vip_out'].includes(
              participation.participation_status,
            ) && (
              <View style={styles.submit}>
                <Text style={[styles.text, styles.description]}>
                  <Text style={styles.color_blue}>{user.name}</Text> possui um
                  convite pendente como{' '}
                  <Text style={styles.color_blue}>
                    {selectedInviteType.inviteDescription || 'convidado'}
                  </Text>
                  !
                </Text>
                <Text style={[styles.text, styles.description]}>
                  Pressione o botão abaixo para{' '}
                  <Text style={styles.color_red}>cancelar</Text> o convite!
                </Text>
                <Button
                  type="red"
                  onPress={handleDelete}
                  title="Cancelar Convite"
                  loading={loading}
                  maxWidth={250}
                />
              </View>
            )}
          {!loadingContent &&
            participation.participation_status === 'user_out' && (
              <View style={styles.submit}>
                <Text style={[styles.text, styles.description]}>
                  <Text style={styles.color_blue}>{user.name}</Text> possui um
                  solicitação pendente!
                </Text>
                <Text style={[styles.text, styles.description]}>
                  Pressione o botão abaixo para{' '}
                  <Text style={styles.color_blue}>aceitar</Text> e{' '}
                  <Text style={styles.color_blue}>promover</Text> para{' '}
                  <Text style={styles.color_blue}>
                    {selectedInviteType.inviteDescription || 'convidado'}
                  </Text>
                  !
                </Text>
                <View style={styles.mod_view}>
                  {selectedInviteType.name === 'mod' && (
                    <Text style={styles.mod}>
                      * Moderador recebe todos os privilégios de administração,
                      exceto a exclusão do evento
                    </Text>
                  )}
                </View>
                <Button
                  type="blue"
                  onPress={() => handleInvite('accept')}
                  title="Aceitar e Promover"
                  loading={loading}
                  maxWidth={250}
                />
              </View>
            )}
          {!loadingContent &&
            ['user_in', 'guest_in', 'mod_in', 'vip_in'].includes(
              participation.participation_status,
            ) && (
              <View style={styles.submit}>
                <Text style={[styles.text, styles.description]}>
                  <Text style={styles.color_blue}>{user.name}</Text> já está
                  participando do evento
                </Text>
                <Text style={[styles.text, styles.description]}>
                  Pressione o botão abaixo para{' '}
                  <Text style={styles.color_blue}>promover</Text> o usuário para{' '}
                  <Text style={styles.color_blue}>
                    {selectedInviteType.inviteDescription || 'convidado'}
                  </Text>
                  !
                </Text>
                <View style={styles.mod_view}>
                  {selectedInviteType.name === 'mod' && (
                    <Text style={styles.mod}>
                      * Moderador recebe todos os privilégios de administração,
                      exceto a exclusão do evento
                    </Text>
                  )}
                </View>
                <Button
                  type="blue"
                  onPress={() =>
                    participation.type.id_participation_type ===
                    selectedInviteType.id_participation_type
                      ? throwInfo(
                          `${user.name} já é um ${selectedInviteType.inviteDescription}`,
                        )
                      : handleInvite('promote')
                  }
                  title="Promover"
                  loading={loading}
                  maxWidth={250}
                  disabled={
                    participation.type.id_participation_type ===
                    selectedInviteType.id_participation_type
                  }
                />
              </View>
            )}
        </View>

        <LineX />
      </ScrollView>
    </AppView>
  );
};

export default EventInviteConfirm;
