import { AppView, View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';

import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@components/Text';
import { Icon } from '@components/Icon';
import { Pressable } from '@components/Pressable';
import styles from './styles';

const EventManage: React.FC<AppProps> = ({ navigation, route }) => {
  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Pressable
              style={styles.card}
              onPress={() => navigation.push('UpdateEvent')}
            >
              <Text style={[styles.text, styles.text_default]}>
                Editar Evento
              </Text>
              <Icon name="chevron" />
            </Pressable>

            {route.params.event.type.verified && (
              <Pressable
                style={styles.card}
                onPress={() => navigation.push('UpdateEventPerformer')}
              >
                <Text style={[styles.text, styles.text_default]}>Artistas</Text>
                <Icon name="chevron" />
              </Pressable>
            )}

            <Pressable
              style={styles.card}
              onPress={() => navigation.push('FinishEvent')}
            >
              <Text style={[styles.text, styles.text_default]}>
                Finalizar Evento
              </Text>
              <Icon name="chevron" />
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.push('DeleteEvent')}
            >
              <Text style={[styles.text, styles.text_red]}>Excluir Evento</Text>
              <Icon name="chevron" tintColor="#E63C3D" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default EventManage;
