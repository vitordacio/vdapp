import React, { useState } from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { Pressable } from '@components/Pressable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { eventService } from '@services/Event';
import { IUpdateName, IUpdateLocation } from '@services/Event/IEventService';
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
    | 'ticket_value'
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
  const { setEvent } = useEvent();

  const { setMessage, handleEntering, setMessageType } = useMessage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let updatedEvent: IEvent;
    let message: string;
    let msgType = 'info';

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
    } catch (error) {
      msgType = 'alert';
      message = error.response.data.message;
    }

    if (msgType !== 'alert') setEvent(updatedEvent);

    setMessageType(msgType);
    setMessage(message);
    handleEntering();

    return navigation.goBack();
    // const goBack =
    //   (type !== 'create_social' && type !== 'delete_social') ||
    //   msgType === 'alert';
    // return goBack ? navigation.goBack() : setConfirm(false);
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
