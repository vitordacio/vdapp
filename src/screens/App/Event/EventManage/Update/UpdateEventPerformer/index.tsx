import React from 'react';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { Pressable } from 'react-native';
import { Icon } from '@components/Icon';
import { IEventPerformer } from '@interfaces/event';
import { Picture } from '@components/Picture';
import { IUser } from '@interfaces/user';
import styles from './styles';

export type UpdatEventPerformerProps = {
  delete_data?: IEventPerformer;
  create_data?: {
    type: 'name' | 'user';
    data: IUser | string;
  };
};

const UpdateEventPerformerScreen: React.FC<AppProps> = ({
  navigation,
  route,
}) => {
  const { event, user: self } = route.params;

  const handleDeletePerformer = async (data: IEventPerformer) => {
    route.params.updateEventPerformer = {
      delete_data: data,
    };
    navigation.push('EventDeletePerformer');
  };

  const onPerformerUserPress = (performer: IEventPerformer) => {
    if (performer.user) {
      if (self.id_user === performer.user.id_user)
        return navigation.navigate('User');

      route.params.user_profile = performer.user;
      return navigation.push('Profile');
    }
    return null;
  };

  let performers: IEventPerformer[];

  if (event.performers.length !== 0) {
    performers = [...event.performers].sort(
      (a, b) =>
        new Date(a.created_at).getDate() - new Date(b.created_at).getDate(),
    );
  }

  return (
    <ViewUpdate
      name="Artistas"
      description="Você pode alterar as informações de artistas a qualquer momento."
    >
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={() => navigation.push('EventSelectPerformer')}
          title="Adicionar Novo"
          type="blue"
        />
      </View>

      <View style={styles.event_performers}>
        <Text style={styles.event_performers_title}>Artistas cadastrados</Text>
        {performers &&
          performers.map(performer => (
            <View
              key={performer.id_performer}
              style={styles.performer_container}
            >
              {performer.user ? (
                <Pressable
                  style={styles.performer_user}
                  onPress={() => onPerformerUserPress(performer)}
                >
                  <Picture card={true} picture={performer.user.picture} />
                  <View style={styles.performer_user_content}>
                    <Text style={styles.performer_name}>
                      {performer.user.name}
                    </Text>
                    <Text style={styles.performer_username}>
                      @{performer.user.username}
                    </Text>
                  </View>
                </Pressable>
              ) : (
                <Text style={styles.performer_name}>{performer.name}</Text>
              )}

              <Pressable onPress={() => handleDeletePerformer(performer)}>
                <Icon name="trash" size={22} />
              </Pressable>
            </View>
          ))}
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventPerformerScreen;
