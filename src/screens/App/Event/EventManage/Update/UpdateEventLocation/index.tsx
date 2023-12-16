import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from '@components/View';
import useEvent from '@contexts/event';
import { IUpdateLocation } from '@services/Event/IEventService';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  location: yup
    .string()
    .min(4, 'O local do evento deve ter ao menos 4 dígitos')
    .max(80, 'O local do evento deve ter no máximo 80 dígitos')
    .required('Informe um nome'),
});

type LocationFormData = yup.InferType<typeof schema>;

const UpdateEventLocation: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { event } = useEvent();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleLocation = async (data: LocationFormData) => {
    setForm({
      event_id: event.id_event,
      location: data.location,
    } as IUpdateLocation);
    setConfirm(true);
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
        <Button
          onPress={handleSubmit(handleLocation)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="location"
          description="Tem certeza que deseja mudar o local do evento?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventLocation;
