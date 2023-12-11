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
import { IUpdateAdditional } from '@services/Event/IEventService';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from '../styles';

const schema = yup.object({
  additional: yup
    .string()
    .max(150, 'Informações adicionais deve ter no máximo 150 dígitos'),
});

type AdditionalFormData = yup.InferType<typeof schema>;

const UpdateEventAdditional: React.FC<
  NativeStackScreenProps<ParamListBase>
> = ({ navigation }) => {
  const { event } = useEvent();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const handleAdditional = async (data: AdditionalFormData) => {
    setForm({
      event_id: event.id_event,
      additional: data.additional,
    } as IUpdateAdditional);
    setConfirm(true);
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
        <Button
          onPress={handleSubmit(handleAdditional)}
          title="Salvar"
          type="blue"
        />
      </View>
      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="additional"
          description="Tem certeza que deseja mudar as informações do evento?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventAdditional;
