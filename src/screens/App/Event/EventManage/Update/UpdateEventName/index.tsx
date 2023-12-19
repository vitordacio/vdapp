import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateName } from '@services/Event/IEventService';
import { EventProps } from '@routes/Event/event.routes';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  name: yup
    .string()
    .min(4, 'O nome do evento deve ter ao menos 4 dígitos')
    .max(30, 'O nome do evento deve ter no máximo 30 dígitos')
    .required('Informe um nome'),
});

type NameFormData = yup.InferType<typeof schema>;

const UpdateEventName: React.FC<EventProps> = ({
  navigation,
  route,
  onUpdateEvent,
}) => {
  const { event } = route.params;
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleName = async (data: NameFormData) => {
    setForm({
      event_id: event.id_event,
      name: data.name,
    } as IUpdateName);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Nome do evento"
      description="Você pode alterar o nome do evento a qualquer momento."
    >
      <ControlledTextInput
        name="name"
        control={control}
        placeholder="Informe um nome"
        defaultValue={event.name}
        error={errors.name}
        maxLength={30}
      />
      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleName)} title="Salvar" type="blue" />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="name"
          description="Tem certeza que deseja mudar o nome do evento?"
          event={event}
          onUpdateEvent={onUpdateEvent}
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventName;
