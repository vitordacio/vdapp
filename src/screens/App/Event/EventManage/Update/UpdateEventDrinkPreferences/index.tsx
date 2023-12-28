import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { IUpdateDrinkPreferences } from '@services/Event/IEventService';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from '../styles';

const schema = yup.object({
  drink_preferences: yup
    .string()
    .max(80, 'Preferência de bebidas deve ter no máximo 80 dígitos'),
});

type DrinkPreferencesFormData = yup.InferType<typeof schema>;

const UpdateEventDrinkPreferences: React.FC<AppProps> = ({
  navigation,
  route,
}) => {
  const { event } = route.params;

  const handleDrinkPreferences = async ({
    drink_preferences,
  }: DrinkPreferencesFormData) => {
    route.params.updateEventConfirm = {
      name: 'Preferência de bebidas',
      description:
        'Tem certeza que deseja mudar a preferência de bebidas do evento?',
      type: 'drink_preferences',
      data: {
        event_id: event.id_event,
        drink_preferences,
      } as IUpdateDrinkPreferences,
    };
    navigation.push('UpdateEventConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DrinkPreferencesFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Preferência de bebidas"
      description="Você pode alterar a preferência de bebidas a qualquer momento."
    >
      <ControlledTextInput
        name="drink_preferences"
        control={control}
        placeholder="Informe a preferência de bebidas"
        defaultValue={event.drink_preferences}
        error={errors.drink_preferences}
        maxLength={80}
        lengthMax={80}
      />
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleSubmit(handleDrinkPreferences)}
          title="Continuar"
        />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventDrinkPreferences;
