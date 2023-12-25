import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateAdditional } from '@services/Event/IEventService';
import { AppProps } from '@routes/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  additional: yup
    .string()
    .max(150, 'Informações adicionais deve ter no máximo 150 dígitos'),
});

type AdditionalFormData = yup.InferType<typeof schema>;

const UpdateEventAdditional: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleAdditional = async ({ additional }: AdditionalFormData) => {
    route.params.updateEventConfirm = {
      name: 'Informações adicionais',
      description: 'Tem certeza que deseja mudar as informações do evento?',
      type: 'additional',
      data: { event_id: event.id_event, additional } as IUpdateAdditional,
    };
    navigation.push('UpdateEventConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdditionalFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Informações adicionais"
      description="Você pode alterar as informações do evento a qualquer momento."
    >
      <ControlledTextInput
        name="additional"
        control={control}
        placeholder="Insira informações adicionais"
        defaultValue={event.additional}
        error={errors.additional}
        maxLength={150}
        lengthMax={150}
      />
      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleAdditional)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventAdditional;
