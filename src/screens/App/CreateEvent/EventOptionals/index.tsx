import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { ParamListBase, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppView, View } from '@components/View';
import { ScrollView, TextInput } from 'react-native';
import { ICreateEvent } from '@services/Event/IEventService';
import { IEventType } from '@interfaces/types';
import colors from '@styles/colors';
import styles from './styles';

type EventParams = ParamListBase & {
  form: ICreateEvent;
  eventType: IEventType;
};

const schema = yup.object({
  additional: yup
    .string()
    .max(150, 'Informação adicional deve ter no máximo 150 dígitos'),
  drink_preferences: yup
    .string()
    .max(80, 'Preferência de bebidas deve ter no máximo 150 dígitos'),
});

type EventFormOptionals = yup.InferType<typeof schema>;

const CreateEventOptionals: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const [moneyValue, setMoneyValue] = useState('');
  const [isMinAmountFocused, setIsMinAmountFocused] = useState(false);
  const [isMinAmountFilled, setIsMinAmountFilled] = useState(false);

  const route = useRoute();
  const { form: formRequireds, eventType } = route.params as EventParams;

  const handleOptionals = async (data: EventFormOptionals) => {
    const form: ICreateEvent = {
      ...formRequireds,
      additional: data.additional,
      drink_preferences: data.drink_preferences,
      min_amount: !moneyValue.includes('NaN') ? moneyValue : undefined,
    };

    navigation.push('CreateEventConfirm', { form, eventType });
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormOptionals>({
    resolver: yupResolver(schema),
  });

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, styles.title]}>Informações Opcionais</Text>
        <Text style={[styles.text, styles.description]}>
          Inclua informações adicionais que podem ser úteis para os usuários
        </Text>

        <ControlledTextInput
          name="additional"
          title="Adicional"
          control={control}
          error={errors.additional}
          placeholder="Inclua informações adicionais"
          lengthMax={150}
          maxLength={150}
        />

        <ControlledTextInput
          name="drink_preferences"
          title="Preferênica de bebidas"
          control={control}
          error={errors.drink_preferences}
          placeholder="Informe a preferência de bebidas"
          maxLength={80}
        />

        <Text style={styles.title_min_amount}>Valor mínimo recomendado</Text>
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
          <Button
            onPress={handleSubmit(handleOptionals)}
            title="Continuar"
            type="blue"
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default CreateEventOptionals;
