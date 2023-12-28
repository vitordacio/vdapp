import React, { useState } from 'react';
import { Button } from '@components/Button';
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
import { IEvent } from '@interfaces/event';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';

export type UpdatEventConfirmProps = {
  name: string;
  description: string;
  data:
    | IUpdateName
    | IUpdateLocation
    | IUpdateHours
    | IUpdateAddress
    | IUpdateAdditional
    | IUpdateDrinkPreferences
    | IUpdateMinAmount
    | IUpdatePerformer
    | IUpdateClubName
    | IUpdateTicketsValue
    | IUpdateTicketsFree
    | IUpdatePrivacy;
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
};

export const UpdateEventConfirm: React.FC<AppProps> = ({
  navigation,
  route,
}) => {
  const { onUpdateEvent, updateEventConfirm } = route.params;

  const { throwInfo, throwError } = useMessage();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const { type, data } = updateEventConfirm;
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
      onUpdateEvent(updatedEvent);
      throwInfo(message);
    }

    route.params.updateEventConfirm = null;
    return navigation.navigate('UpdateEventScreen');
  };

  return (
    <ViewUpdate
      name={updateEventConfirm.name}
      description={updateEventConfirm.description}
    >
      <Button
        loading={loading}
        onPress={handleConfirm}
        title="Confirmar"
        type="blue"
      />
    </ViewUpdate>
  );
};
