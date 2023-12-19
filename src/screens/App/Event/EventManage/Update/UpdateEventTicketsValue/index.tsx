import React, { useState } from 'react';
import { Button } from '@components/Button';
import { TextInput } from 'react-native';
import { View } from '@components/View';
import { IUpdateTicketsValue } from '@services/Event/IEventService';
import colors from '@styles/colors';
import { EventProps } from '@routes/Event/event.routes';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from './styles';

const UpdateEventTicketsValue: React.FC<EventProps> = ({
  navigation,
  route,
  onUpdateEvent,
}) => {
  const { event } = route.params;
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const [moneyValue, setMoneyValue] = useState('');
  const [isTicketValueFocused, setIsTicketValueFocused] = useState(false);
  const [isTicketValueFilled, setIsTicketValueFilled] = useState(false);

  const handleTicketValue = async () => {
    setForm({
      event_id: event.id_event,
      tickets_value: !moneyValue.includes('NaN') ? moneyValue : undefined,
    } as IUpdateTicketsValue);
    setConfirm(true);
  };

  const formatMoney = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    const floatValue = parseFloat(numericValue) / 100;

    const formattedValue = floatValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    return formattedValue;
  };

  const handleTicketValueChange = (text: string) => {
    setMoneyValue(formatMoney(text));
  };

  function handleTicketValueFocus() {
    setIsTicketValueFocused(true);
  }

  async function handleTicketValueBlur() {
    setIsTicketValueFocused(false);
    setIsTicketValueFilled(!!moneyValue);
  }

  return (
    <ViewUpdate
      name="Valor mínimo recomendado"
      description="Você pode alterar o valor mínimo recomendado a qualquer momento."
    >
      <View style={styles.container_min_amount}>
        <TextInput
          style={[
            styles.input_min_amount,
            {
              color: `${
                (isTicketValueFocused && isTicketValueFilled) ||
                isTicketValueFilled
                  ? `${colors.WHITE}`
                  : `${colors.GRAY_INPUT_PLACEHOLDER}`
              }`,
            },
          ]}
          maxLength={14}
          keyboardType="numeric"
          placeholder="Digite o valor"
          value={moneyValue}
          onChangeText={e => {
            handleTicketValueChange(e);
            setIsTicketValueFilled(!!e);
          }}
          onFocus={handleTicketValueFocus}
          onBlur={handleTicketValueBlur}
        />
      </View>

      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={() => handleTicketValue()}
          title="Salvar"
          type="blue"
        />
      </View>

      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="tickets_value"
          description="Tem certeza que deseja mudar as informações do evento?"
          event={event}
          onUpdateEvent={onUpdateEvent}
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventTicketsValue;
