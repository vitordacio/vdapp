import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateLocation } from '@services/Event/IEventService';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  location: yup
    .string()
    .min(4, 'O local do evento deve ter ao menos 4 dígitos')
    .max(80, 'O local do evento deve ter no máximo 80 dígitos')
    .required('Informe um nome'),
});

type LocationFormData = yup.InferType<typeof schema>;

const UpdateEventLocation: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleLocation = async ({ location }: LocationFormData) => {
    route.params.updateEventConfirm = {
      name: 'Local do evento',
      description: 'Tem certeza que deseja mudar o local do evento?',
      type: 'location',
      data: {
        event_id: event.id_event,
        location,
      } as IUpdateLocation,
    };
    navigation.push('UpdateEventConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Local do evento"
      description="Você pode editar o local do evento a qualquer momento."
    >
      <ControlledTextInput
        name="location"
        control={control}
        icon="map-pin"
        placeholder="Informe o local do evento"
        defaultValue={event.location}
        error={errors.location}
        maxLength={80}
      />
      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleLocation)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventLocation;
