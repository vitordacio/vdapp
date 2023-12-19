import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdatePerformer } from '@services/Event/IEventService';
import { EventProps } from '@routes/Event/event.routes';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  performer: yup
    .string()
    .max(80, 'Informações adicionais deve ter no máximo 80 dígitos'),
});

type PerformerFormData = yup.InferType<typeof schema>;

const UpdateEventPerformer: React.FC<EventProps> = ({
  navigation,
  route,
  onUpdateEvent,
}) => {
  const { event } = route.params;
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handlePerformer = async (data: PerformerFormData) => {
    setForm({
      event_id: event.id_event,
      performer: data.performer,
    } as IUpdatePerformer);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PerformerFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Artista"
      description="Você pode alterar as informações do artista a qualquer momento."
    >
      <ControlledTextInput
        name="performer"
        control={control}
        placeholder="Insira um artista"
        defaultValue={event.performer}
        error={errors.performer}
        maxLength={80}
      />
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleSubmit(handlePerformer)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="performer"
          description="Tem certeza que deseja mudar as informações do artista?"
          event={event}
          onUpdateEvent={onUpdateEvent}
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventPerformer;
