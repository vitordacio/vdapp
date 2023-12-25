import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateName } from '@services/Event/IEventService';
import { AppProps } from '@routes/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  name: yup
    .string()
    .min(4, 'O nome do evento deve ter ao menos 4 dígitos')
    .max(30, 'O nome do evento deve ter no máximo 30 dígitos')
    .required('Informe um nome'),
});

type NameFormData = yup.InferType<typeof schema>;

const UpdateEventName: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleName = async ({ name }: NameFormData) => {
    route.params.updateEventConfirm = {
      name: 'Nome do evento',
      description: 'Tem certeza que deseja mudar o nome do evento?',
      type: 'name',
      data: { event_id: event.id_event, name } as IUpdateName,
    };
    navigation.push('UpdateEventConfirm');
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
        <Button onPress={handleSubmit(handleName)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventName;
