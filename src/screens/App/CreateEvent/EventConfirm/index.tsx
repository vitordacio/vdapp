import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ScrollView } from 'react-native';
import { eventService } from '@services/Event';
import { formatTimeRange } from '@utils/formaters';
import { AppProps } from '@routes/App/app.routes';
import useMessage from '@contexts/message';
import { IEvent } from '@interfaces/event';
import { Icon } from '@components/Icon';
import styles from './styles';

const CreateEventConfirm: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwInfo, throwError } = useMessage();
  const [loading, setLoading] = useState(false);
  const { form, eventType } = route.params.createEvent;

  const handleCreateEvent = async () => {
    setLoading(true);
    let event: IEvent;
    let message: string;
    try {
      event = await eventService.createEvent(form);
      event.type = eventType;

      message = 'Evento criado com sucesso!';
      setLoading(false);
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (event) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      route.params.event = event;
      throwInfo(message);
      navigation.navigate('Event');
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
          <Icon
            name={eventType.name}
            tintColor={eventType.verified && '#F2C94D'}
          />

          <Text style={[styles.text_default_color, styles.text_large]}>
            Nome: {form.name}
          </Text>
        </View>
        <View style={styles.data_text}>
          <Icon name="location" />
          <Text style={[styles.text_default_color, styles.text_large]}>
            Local: {form.location}
          </Text>
        </View>
        <View style={styles.data_text}>
          <Icon name="clock" />
          <Text style={[styles.text_default_color, styles.text_large]}>
            Horário: {formatTimeRange(form.start_time, form.finish_time)}
          </Text>
        </View>
        <View style={styles.data_text}>
          <Icon name="attach" />
          <Text style={[styles.text_gray_color, styles.text_large]}>
            Adicional: {form.additional || '--'}
          </Text>
        </View>
        <View style={styles.data_text}>
          <Icon name="drink" />
          <Text style={[styles.text_gray_color, styles.text_large]}>
            Preferência de bebidas: {form.drink_preferences || '--'}
          </Text>
        </View>
        <View style={styles.data_text}>
          <Icon name="coin" />
          <Text style={[styles.text_gray_color, styles.text_large]}>
            Valor mínimo recomendado: {form.min_amount || '--'}
          </Text>
        </View>

        {eventType.verified && (
          <>
            <View style={styles.data_text}>
              <Icon name="club" />
              <Text style={[styles.text_gray_color, styles.text_large]}>
                Nome do clube: {form.club_name || '--'}
              </Text>
            </View>
            <View style={styles.data_text}>
              <Icon name="ticket" />
              <Text style={[styles.text_gray_color, styles.text_large]}>
                Valor de entrada: {form.ticket_value || '--'}
              </Text>
            </View>
          </>
        )}

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
