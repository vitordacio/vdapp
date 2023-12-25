import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdatePerformer } from '@services/Event/IEventService';
import { AppProps } from '@routes/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  performer: yup
    .string()
    .max(80, 'Informações adicionais deve ter no máximo 80 dígitos'),
});

type PerformerFormData = yup.InferType<typeof schema>;

const UpdateEventPerformer: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handlePerformer = async ({ performer }: PerformerFormData) => {
    route.params.updateEventConfirm = {
      name: 'Artista',
      description: 'Tem certeza que deseja mudar o artista do evento?',
      type: 'performer',
      data: {
        event_id: event.id_event,
        performer,
      } as IUpdatePerformer,
    };
    navigation.push('UpdateEventConfirm');
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
        <Button onPress={handleSubmit(handlePerformer)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventPerformer;
