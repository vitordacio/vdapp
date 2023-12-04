import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { ParamListBase, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppView, View } from '@components/View';
import { IEventType } from '@interfaces/types';
import { ScrollView } from 'react-native';
import { eventService } from '@services/Event';
import styles from './styles';

type EventParams = ParamListBase & {
  eventType: IEventType;
};

const schema = yup.object({
  name: yup
    .string()
    .max(150, 'O nome deve ter no máximo 150 dígitos')
    .required('Informe o name'),
  location: yup
    .string()
    .max(150, 'A localização deve ter no máximo 150 dígitos')
    .required('Informe o local do evento'),
});

type EventFormRequireds = yup.InferType<typeof schema>;

const CreateEventRequireds: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const route = useRoute();
  const { eventType } = route.params as EventParams;

  const handleRequireds = async (data: EventFormRequireds) => {
    try {
      const event = await eventService.createEvent({
        type_id: eventType.id_event_type,
        name: data.name,
        location: data.location,
      });

      event.type = eventType;

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigation.navigate('Event', { event });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormRequireds>({
    resolver: yupResolver(schema),
  });

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, styles.title]}>
          Informações Obrigatórias
        </Text>
        <Text style={[styles.text, styles.description]}>
          Forneça todas as informações essenciais para o seu evento{' '}
        </Text>

        <ControlledTextInput
          name="name"
          title="Nome"
          control={control}
          error={errors.name}
          placeholder="Informe um nome"
        />

        <ControlledTextInput
          name="location"
          title="Local"
          control={control}
          error={errors.location}
          placeholder="Informe o local do evento"
        />

        <View style={styles.confirm_button_wrapper}>
          <Button
            onPress={handleSubmit(handleRequireds)}
            title="Continuar"
            type="blue"
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default CreateEventRequireds;
