import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateTicketsFree } from '@services/Event/IEventService';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  tickets_free: yup
    .number()
    .typeError('Por favor, insira um número válido')
    .max(5, 'Entradas grátis deve ter no máximo 5 dígitos'),
});

type TicketsFreeFormData = yup.InferType<typeof schema>;

const UpdateEventTicketsFree: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleTicketsFree = async ({ tickets_free }: TicketsFreeFormData) => {
    route.params.updateEventConfirm = {
      name: 'Entradas grátis',
      description:
        'Tem certeza que deseja mudar a quantidade de entrada grátis?',
      type: 'tickets_free',
      data: {
        event_id: event.id_event,
        tickets_free: tickets_free.toString(),
      } as IUpdateTicketsFree,
    };
    navigation.push('UpdateEventConfirm');
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
        <Button onPress={handleSubmit(handleTicketsFree)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventTicketsFree;
