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
import { IUpdateTicketsFree } from '@services/Event/IEventService';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  tickets_free: yup
    .string()
    .max(5, 'Entradas grátis deve ter no máximo 5 dígitos'),
});

type TicketsFreeFormData = yup.InferType<typeof schema>;

const UpdateEventTicketsFree: React.FC<
  NativeStackScreenProps<ParamListBase>
> = ({ navigation }) => {
  const { event } = useEvent();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleTicketsFree = async (data: TicketsFreeFormData) => {
    setForm({
      event_id: event.id_event,
      tickets_free: data.tickets_free,
    } as IUpdateTicketsFree);
    setConfirm(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketsFreeFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Entradas grátis"
      description="Você pode alterar a quantidade de entrada grátis a qualquer momento."
    >
      <ControlledTextInput
        name="tickets_free"
        control={control}
        placeholder="Informe a quantidade de entradas grátis"
        defaultValue={event.tickets_free}
        error={errors.tickets_free}
        maxLength={5}
        keyboardType="numeric"
      />
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleSubmit(handleTicketsFree)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="tickets_free"
          description="Tem certeza que deseja mudar a quantidade de entrada grátis?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventTicketsFree;
