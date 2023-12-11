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
import { IUpdateDrinkPreferences } from '@services/Event/IEventService';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  drink_preferences: yup
    .string()
    .max(80, 'Preferência de bebidas deve ter no máximo 80 dígitos'),
});

type DrinkPreferencesFormData = yup.InferType<typeof schema>;

const UpdateEventDrinkPreferences: React.FC<
  NativeStackScreenProps<ParamListBase>
> = ({ navigation }) => {
  const { event } = useEvent();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleDrinkPreferences = async (data: DrinkPreferencesFormData) => {
    setForm({
      event_id: event.id_event,
      drink_preferences: data.drink_preferences,
    } as IUpdateDrinkPreferences);
    setConfirm(true);
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
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="drink_preferences"
          description="Tem certeza que deseja mudar a preferência de bebidas do evento?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventDrinkPreferences;
