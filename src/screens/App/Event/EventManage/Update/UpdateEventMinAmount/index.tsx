import React, { useState } from 'react';
import { Button } from '@components/Button';
import { TextInput } from 'react-native';
import { View } from '@components/View';
import { IUpdateMinAmount } from '@services/Event/IEventService';
import colors from '@styles/colors';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import styles from './styles';

const UpdateEventMinAmount: React.FC<AppProps> = ({ navigation, route }) => {
  const { throwError } = useMessage();
  const { event } = route.params;

  const [moneyValue, setMoneyValue] = useState('');
  const [isMinAmountFocused, setIsMinAmountFocused] = useState(false);
  const [isMinAmountFilled, setIsMinAmountFilled] = useState(false);

  const handleMinAmount = async () => {
    const value = moneyValue.split(/(?:\s| )+/)[1].replace(',', '.');

    const isValid = value && !Number.isNaN(Number(value));

    if (isValid) {
      route.params.updateEventConfirm = {
        name: 'Valor mínimo recomendado',
        description:
          'Tem certeza que deseja mudar o valor mínimo recomendado do evento?',
        type: 'min_amount',
        data: {
          event_id: event.id_event,
          min_amount: value,
        } as IUpdateMinAmount,
      };
      navigation.push('UpdateEventConfirm');
    } else {
      throwError('Informe um número válido');
    }
  };

  const formatMoney = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    const floatValue = parseFloat(numericValue) / 100;

    let formattedValue = floatValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    if (formattedValue.includes('NaN')) {
      formattedValue = formattedValue.replace('NaN', '');
    }

    return formattedValue;
  };

  const handleMinAmountChange = (text: string) => {
    setMoneyValue(formatMoney(text));
  };

  function handleMinAmountFocus() {
    setIsMinAmountFocused(true);
  }

  async function handleMinAmountBlur() {
    setIsMinAmountFocused(false);
    setIsMinAmountFilled(!!moneyValue);
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
                (isMinAmountFocused && isMinAmountFilled) || isMinAmountFilled
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
            handleMinAmountChange(e);
            setIsMinAmountFilled(!!e);
          }}
          onFocus={handleMinAmountFocus}
          onBlur={handleMinAmountBlur}
        />
      </View>

      <View style={styles.confirm_button_wrapper}>
        <Button onPress={() => handleMinAmount()} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateEventMinAmount;
