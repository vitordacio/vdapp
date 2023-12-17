import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateClubName } from '@services/Event/IEventService';
import { EventAndOnUpdateProps } from '@routes/event.routes';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  club_name: yup
    .string()
    .max(80, 'Informações adicionais deve ter no máximo 80 dígitos'),
});

type ClubNameFormData = yup.InferType<typeof schema>;

const UpdateEventClubName: React.FC<EventAndOnUpdateProps> = ({
  navigation,
  route,
  onUpdateEvent,
}) => {
  const { event } = route.params;
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleClubName = async (data: ClubNameFormData) => {
    setForm({
      event_id: event.id_event,
      club_name: data.club_name,
    } as IUpdateClubName);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClubNameFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Nome do clube"
      description="Você pode alterar o nome do clube a qualquer momento."
    >
      <ControlledTextInput
        name="club_name"
        control={control}
        placeholder="Informe o nome do clube"
        defaultValue={event.club_name}
        error={errors.club_name}
        maxLength={80}
      />
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleSubmit(handleClubName)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="club_name"
          description="Tem certeza que deseja mudar o nome do clube?"
          event={event}
          onUpdateEvent={onUpdateEvent}
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventClubName;
