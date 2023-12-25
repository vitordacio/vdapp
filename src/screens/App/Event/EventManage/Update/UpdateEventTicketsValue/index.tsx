import React, { useState } from 'react';
import { Button } from '@components/Button';
import { TextInput } from 'react-native';
import { View } from '@components/View';
import { IUpdateTicketsValue } from '@services/Event/IEventService';
import colors from '@styles/colors';
import { AppProps } from '@routes/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from './styles';

const UpdateEventTicketsValue: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const [moneyValue, setMoneyValue] = useState('');
  const [isTicketValueFocused, setIsTicketValueFocused] = useState(false);
  const [isTicketValueFilled, setIsTicketValueFilled] = useState(false);

  const handleTicketValue = async () => {
    route.params.updateEventConfirm = {
      name: 'Valor de entrada',
      description: 'Tem certeza que deseja mudar o valor de entrada do evento?',
      type: 'tickets_value',
      data: {
        event_id: event.id_event,
        tickets_value: !moneyValue.includes('NaN') ? moneyValue : undefined,
      } as IUpdateTicketsValue,
    };
    navigation.push('UpdateEventConfirm');
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
      name="Valor de entrada"
      description="Você pode alterar o valor de entrada a qualquer momento."
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
        <Button onPress={() => handleTicketValue()} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventTicketsValue;
