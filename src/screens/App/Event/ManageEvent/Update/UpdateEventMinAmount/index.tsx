import React, { useState } from 'react';
import { Button } from '@components/Button';
import { ParamListBase } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from '@components/View';
import useEvent from '@contexts/event';
import { IUpdateMinAmount } from '@services/Event/IEventService';
import colors from '@styles/colors';
import { ViewUpdate } from '../ViewUpdate';
import { ViewConfirm } from '../ViewConfirm';
import styles from './styles';

const UpdateEventMinAmount: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const { event } = useEvent();

  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({});

  const [moneyValue, setMoneyValue] = useState('');
  const [isMinAmountFocused, setIsMinAmountFocused] = useState(false);
  const [isMinAmountFilled, setIsMinAmountFilled] = useState(false);

  const handleMinAmount = async () => {
    setForm({
      event_id: event.id_event,
      min_amount: !moneyValue.includes('NaN') ? moneyValue : undefined,
    } as IUpdateMinAmount);
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
        <Button onPress={() => handleMinAmount()} title="Salvar" type="blue" />
      </View>

      {confirm && (
        <ViewConfirm
          data={form}
          navigation={navigation}
          setConfirm={setConfirm}
          type="min_amount"
          description="Tem certeza que deseja mudar as informações do evento?"
        />
      )}
    </ViewUpdate>
  );
};

export default UpdateEventMinAmount;
