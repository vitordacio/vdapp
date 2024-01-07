import React from 'react';
import { View } from '@components/View';
import { Text } from '@components/Text';
import { IParticipation } from '@interfaces/participation';
import { formatDate } from '@utils/formaters';
import { Pressable } from '@components/Pressable';
import { Picture } from '@components/Picture';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

type CardParticipationEventTopTabProps = AppProps & {
  participation: IParticipation;
};

const CardParticipationEventTopTab: React.FC<
  CardParticipationEventTopTabProps
> = ({ participation, navigation, route }) => {
  const { user: self } = route.params;

  const { type, user } = participation;

  let participationType: string;
  if (type.name === 'user') participationType = 'Participante';
  if (type.name === 'guest') participationType = 'Convidado';
  if (type.name === 'vip') participationType = 'Convidado VIP';
  if (type.name === 'mod') participationType = 'Moderador';

  const onPress = () => {
    if (self.id_user === user.id_user) {
      navigation.navigate('User');
    } else {
      route.params.user_profile = user;
      navigation.push('Profile');
    }
  };

  return (
    <>
      {participation && participation.in && (
        <Pressable style={styles.container} onPress={onPress}>
          {participationType && (
            <View style={styles.participation}>
              <Text style={[styles.text_gold_color, styles.text_large]}>
                {participationType}
              </Text>
            </View>
          )}

          {user && (
            <View style={styles.container_author}>
              <Picture card={true} picture={user.picture} />
              <View style={styles.data_author}>
                {user.username && (
                  <Text style={[styles.text_default_color, styles.text_medium]}>
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

          <Text style={styles.created_at}>
            {formatDate(participation.created_at, self.locale)}
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default CardParticipationEventTopTab;
