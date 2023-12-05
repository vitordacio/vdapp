import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { ParamListBase, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppView, View } from '@components/View';
import { ImageBackground, ScrollView, Image } from 'react-native';
import { ICreateEvent } from '@services/Event/IEventService';
import { eventService } from '@services/Event';
import assets from '@assets/index';
import { IEventType } from '@interfaces/types';
import styles from './styles';

type EventParams = ParamListBase & {
  form: ICreateEvent;
  eventType: IEventType;
};

// club_name
// ticket_value
// performer

const CreateEventConfirm: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { form, eventType } = route.params as EventParams;

  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      const event = await eventService.createEvent(form);

      event.type = eventType;

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigation.navigate('Event', { event });
      setLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, styles.title]}>Confirmar Evento</Text>
        <Text style={[styles.text, styles.description]}>
          Revise as informações fornecidas
        </Text>

        <View style={styles.data_text}>
          <Image
            style={styles.icon}
            source={assets[eventType.name]}
            resizeMode="contain"
            tintColor="#fff"
          />
          <Text style={[styles.text_default_color, styles.text_large]}>
            {form.name}
          </Text>
        </View>
        <View style={styles.data_text}>
          <ImageBackground
            style={styles.icon}
            source={assets.location}
            resizeMode="contain"
            tintColor="#fff"
          />
          <Text style={[styles.text_default_color, styles.text_medium]}>
            {form.location}
          </Text>
        </View>
        <View style={styles.data_text}>
          <ImageBackground
            style={styles.icon}
            source={assets.clock}
            resizeMode="contain"
            tintColor="#fff"
          />
          <Text style={[styles.text_default_color, styles.text_medium]}>
            {(form.start, form.finish)}
          </Text>
        </View>
        <View style={styles.data_text}>
          <ImageBackground
            style={styles.icon}
            source={assets.attach}
            resizeMode="contain"
            tintColor="#fff"
          />
          <Text style={[styles.text_gray_color, styles.text_medium]}>
            {form.additional || '--'}
          </Text>
        </View>
        <View style={styles.data_text}>
          <ImageBackground
            style={styles.icon}
            source={assets.drink}
            resizeMode="contain"
            tintColor="#fff"
          />
          <Text style={[styles.text_gray_color, styles.text_medium]}>
            {form.drink_preferences || '--'}
          </Text>
        </View>
        <View style={styles.data_text}>
          <ImageBackground
            style={styles.icon}
            source={assets.coin}
            resizeMode="contain"
            tintColor="#fff"
          />
          <Text style={[styles.text_gray_color, styles.text_medium]}>
            {form.min_amount || '--'}
          </Text>
        </View>

        <View style={styles.confirm_button_wrapper}>
          <Button
            onPress={handleCreateEvent}
            title="Confirmar"
            type="dark_gold"
            loading={loading}
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default CreateEventConfirm;
