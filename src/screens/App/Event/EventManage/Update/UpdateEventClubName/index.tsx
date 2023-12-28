import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateClubName } from '@services/Event/IEventService';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  club_name: yup
    .string()
    .max(80, 'Informações adicionais deve ter no máximo 80 dígitos'),
});

type ClubNameFormData = yup.InferType<typeof schema>;

const UpdateEventClubName: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleClubName = async ({ club_name }: ClubNameFormData) => {
    route.params.updateEventConfirm = {
      name: 'Nome do clube',
      description: 'Tem certeza que deseja mudar o nome do clube?',
      type: 'club_name',
      data: { event_id: event.id_event, club_name } as IUpdateClubName,
    };
    navigation.push('UpdateEventConfirm');
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
        <Button onPress={handleSubmit(handleClubName)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventClubName;
