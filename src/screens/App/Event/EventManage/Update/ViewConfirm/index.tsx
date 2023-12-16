import React, { useState } from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { Pressable } from '@components/Pressable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { eventService } from '@services/Event';
import {
  IUpdateName,
  IUpdateLocation,
  IUpdateHours,
  IUpdatePrivacy,
  IUpdateAddress,
  IUpdateDrinkPreferences,
  IUpdateAdditional,
  IUpdateMinAmount,
  IUpdateClubName,
  IUpdatePerformer,
  IUpdateTicketsFree,
  IUpdateTicketsValue,
} from '@services/Event/IEventService';
import useMessage from '@contexts/message';
import useEvent from '@contexts/event';
import { IEvent } from '@interfaces/event';
import styles from './styles';

interface IViewConfirmProps
  extends Partial<NativeStackScreenProps<ParamListBase>> {
  data: object | string;
  type:
    | 'name'
    | 'location'
    | 'hours'
    | 'address'
    | 'additional'
    | 'drink_preferences'
    | 'min_amount'
    | 'performer'
    | 'club_name'
    | 'tickets_value'
    | 'tickets_free'
    | 'privacy';
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}

export const ViewConfirm: React.FC<IViewConfirmProps> = ({
  setConfirm,
  type,
  data,
  description,
  navigation,
}) => {
  const { event, setEvent } = useEvent();

  const { throwInfo, throwError } = useMessage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let updatedEvent: IEvent;
    let message: string;

    try {
      if (type === 'name') {
        updatedEvent = await eventService.updateName(data as IUpdateName);
        message = 'Nome do evento alterado com sucesso!';
      }
      if (type === 'location') {
        updatedEvent = await eventService.updateLocation(
          data as IUpdateLocation,
        );
        message = 'Local do evento alterado com sucesso!';
      }
      if (type === 'hours') {
        updatedEvent = await eventService.updateHours(data as IUpdateHours);
        message = 'Horário do evento alterado com sucesso!';
      }
      if (type === 'privacy') {
        updatedEvent = await eventService.updatePrivacy(data as IUpdatePrivacy);
        message = 'Privacidade do evento alterada com sucesso!';
      }
      if (type === 'address') {
        updatedEvent = await eventService.updateAddress(data as IUpdateAddress);
        message = 'Localização do evento alterada com sucesso!';
      }
      if (type === 'additional') {
        updatedEvent = await eventService.updateAdditional(
          data as IUpdateAdditional,
        );
        message = 'Informações adicionais alterada com sucesso!';
      }
      if (type === 'drink_preferences') {
        updatedEvent = await eventService.updateDrinkPreferences(
          data as IUpdateDrinkPreferences,
        );
        message = 'Preferência de bebidas alterada com sucesso!';
      }
      if (type === 'min_amount') {
        updatedEvent = await eventService.updateMinAmount(
          data as IUpdateMinAmount,
        );
        message = 'Valor mínimo recomendado alterado com sucesso!';
      }
      if (type === 'performer') {
        updatedEvent = await eventService.updatePerformer(
          data as IUpdatePerformer,
        );
        message = 'Artista alterado com sucesso!';
      }
      if (type === 'club_name') {
        updatedEvent = await eventService.updateClubName(
          data as IUpdateClubName,
        );
        message = 'Nome do clube alterado com sucesso!';
      }
      if (type === 'tickets_value') {
        updatedEvent = await eventService.updateTicketsValue(
          data as IUpdateTicketsValue,
        );
        message = 'Valor de entrada alterado com sucesso!';
      }
      if (type === 'tickets_free') {
        updatedEvent = await eventService.updateTicketsFree(
          data as IUpdateTicketsFree,
        );
        message = 'Número de entradas grátis alterado com sucesso!';
      }
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (updatedEvent) {
      updatedEvent.status = event.status;
      updatedEvent.participation_status = event.participation_status;
      setEvent(updatedEvent);
      throwInfo(message);
    }

    return navigation.goBack();
  };

  return (
    <Pressable style={styles.container} onPress={() => setConfirm(false)}>
      <View style={styles.content}>
        <View style={styles.close_content}>
          <Pressable onPress={() => setConfirm(false)}>
            <Feather name="x" size={30} color="black" />
          </Pressable>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Button
          type="dark"
          title="Confirmar"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </Pressable>
  );
};
