import { AppView, View } from '@components/View';
import React from 'react';
import { ScrollView } from 'react-native';
import { AppProps } from '@routes/App/app.routes';
import {
  CardUpdateOptions,
  ICardUpdateOption,
} from '@components/Card/UpdateOptions';
import styles from './styles';

const UpdateEvent: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const options = {
    name: {
      title: 'Nome',
      redirect: 'UpdateEventName',
      description: `${event.name}`,
    },
    location: {
      title: 'Local',
      redirect: 'UpdateEventLocation',
      description: `${event.location}`,
    },
    hours: {
      title: 'Horário',
      redirect: 'UpdateEventHours',
      description: `${event.start_time} | ${event.finish_time}`,
    },
    privacy: {
      title: 'Privacidade',
      redirect: 'UpdateEventPrivacy',
      icon: 'arrow_right',
      description: `${
        event.private ? 'Esse evento é privado' : 'Esse evento é público'
      }`,
    },
    address: {
      title: 'Localização',
      redirect: 'UpdateEventAddress',
      icon: 'arrow_right',
      description: `${
        event.address?.id_address || 'Adicione a localização do evento'
      }`,
    },
    additional: {
      title: 'Informações Adicionais',
      redirect: 'UpdateEventAdditional',
      icon: 'plus_simple',
    },
    drink_preferences: {
      title: 'Preferência de bebidas',
      redirect: 'UpdateEventDrinkPreferences',
      icon: 'plus_simple',
    },
    min_amount: {
      title: 'Valor mínimo recomendado',
      redirect: 'UpdateEventMinAmount',
      icon: 'plus_simple',
    },
    performer: {
      title: 'Artista',
      redirect: 'UpdateEventPerformer',
      description: `${event.performer || 'Informe um artista'}`,
    },
    club_name: {
      title: 'Nome do clube',
      redirect: 'UpdateEventClubName',
      description: `${event.club_name || 'Informe o nome do clube'}`,
    },
    ticket_value: {
      title: 'Valor de entrada',
      redirect: 'UpdateEventTicketsValue',
      description: `${event.ticket_value || 'Informe o valor da entrada'}`,
    },
    tickets_free: {
      title: 'Entradas grátis',
      redirect: 'UpdateEventTicketsFree',
      description: `${event.tickets_free || 0} entradas grátis disponível`,
    },
  } as {
    name: ICardUpdateOption;
    location: ICardUpdateOption;
    hours: ICardUpdateOption;
    privacy: ICardUpdateOption;
    address: ICardUpdateOption;
    additional: ICardUpdateOption;
    drink_preferences: ICardUpdateOption;
    min_amount: ICardUpdateOption;
    performer: ICardUpdateOption;
    club_name: ICardUpdateOption;
    ticket_value: ICardUpdateOption;
    tickets_free: ICardUpdateOption;
  };

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {options && (
          <View style={styles.container}>
            <View style={styles.options}>
              <CardUpdateOptions
                navigation={navigation}
                options={[options.name, options.location, options.hours]}
              />

              <CardUpdateOptions
                navigation={navigation}
                options={[options.address]}
              />

              <CardUpdateOptions
                navigation={navigation}
                options={[
                  options.additional,
                  options.drink_preferences,
                  options.min_amount,
                ]}
              />

              <CardUpdateOptions
                navigation={navigation}
                options={[
                  options.performer,
                  options.club_name,
                  options.ticket_value,
                  options.tickets_free,
                ]}
              />

              <CardUpdateOptions
                navigation={navigation}
                options={[options.privacy]}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </AppView>
  );
};

export default UpdateEvent;
