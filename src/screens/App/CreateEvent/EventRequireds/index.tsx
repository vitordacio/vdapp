import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput, TextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { ParamListBase, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppView, View } from '@components/View';
import { IEventType } from '@interfaces/types';
import {
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
  Switch,
} from 'react-native';
import { eventService } from '@services/Event';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioInput } from '@components/Input/RadioInput';
import styles from './styles';

type EventParams = ParamListBase & {
  eventType: IEventType;
};

const schema = yup.object({
  name: yup
    .string()
    .max(150, 'O nome deve ter no máximo 150 dígitos')
    .required('Informe o name'),
  location: yup
    .string()
    .max(150, 'A localização deve ter no máximo 150 dígitos')
    .required('Informe o local do evento'),
});

type EventFormRequireds = yup.InferType<typeof schema>;

const CreateEventRequireds: React.FC<NativeStackScreenProps<ParamListBase>> = ({
  navigation,
}) => {
  const [startTime, setStartTime] = useState('');
  const [customStartTime, setCustomStartTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [finishTime, setFinishTime] = useState('');
  const [customFinishTime, setCustomFinishTime] = useState(new Date());
  const [showFinishPicker, setShowFinishPicker] = useState(false);

  const [privacy, setPrivacy] = useState(false);

  const route = useRoute();
  const { eventType } = route.params as EventParams;

  const handleRequireds = async (data: EventFormRequireds) => {
    try {
      const event = await eventService.createEvent({
        type_id: eventType.id_event_type,
        name: data.name,
        location: data.location,
        // private: privacy,
      });

      event.type = eventType;

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigation.navigate('Event', { event });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const toggleStartDatepicker = () => {
    setShowStartPicker(!showStartPicker);
  };

  const onStartTimeChange = ({ type }, selectedDate: Date) => {
    if (type === 'set') {
      const date = selectedDate;
      setCustomStartTime(date);

      if (Platform.OS === 'android') {
        toggleStartDatepicker();
        setStartTime(date.toDateString());
      }
    } else {
      toggleStartDatepicker();
    }
  };

  const confirmStartIOSDate = () => {
    setStartTime(customStartTime.toDateString());
    toggleStartDatepicker();
  };

  const toggleFinishDatepicker = () => {
    setShowFinishPicker(!showFinishPicker);
  };

  const onFinishTimeChange = ({ type }, selectedDate: Date) => {
    if (type === 'set') {
      const date = selectedDate;
      setCustomFinishTime(date);

      if (Platform.OS === 'android') {
        toggleFinishDatepicker();
        setFinishTime(date.toDateString());
      }
    } else {
      toggleFinishDatepicker();
    }
  };

  const confirmFinishIOSDate = () => {
    setFinishTime(customFinishTime.toDateString());
    toggleFinishDatepicker();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormRequireds>({
    resolver: yupResolver(schema),
  });

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, styles.title]}>
          Informações Obrigatórias
        </Text>
        <Text style={[styles.text, styles.description]}>
          Forneça todas as informações essenciais para o seu evento{' '}
        </Text>

        <ControlledTextInput
          name="name"
          title="Nome"
          control={control}
          error={errors.name}
          placeholder="Informe um nome"
        />

        <ControlledTextInput
          name="location"
          title="Local"
          control={control}
          error={errors.location}
          placeholder="Informe o local do evento"
        />

        <Text style={styles.datetime_title}>Começa:</Text>

        <View style={styles.marginLeft}>
          <RadioInput
            title="Agora"
            currentValue={startTime}
            handleSubmit={() => setStartTime('')}
            value=""
          />
        </View>

        <View style={styles.wrapper}>
          <View style={[styles.radio_wrapper, styles.marginLeft]}>
            <TouchableOpacity
              onPress={() => {
                setStartTime(customStartTime.toDateString());
              }}
              style={[
                styles.radio,
                {
                  backgroundColor: `${startTime ? 'blue' : 'white'}`,
                },
              ]}
            />
          </View>

          {showStartPicker && (
            <DateTimePicker
              mode="datetime"
              display="spinner"
              value={customStartTime}
              onChange={onStartTimeChange}
              style={styles.datePicker}
              minimumDate={new Date()}
            />
          )}

          {showStartPicker && Platform.OS === 'ios' && (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.pickerButton,
                  { backgroundColor: '#11182711' },
                ]}
                onPress={toggleStartDatepicker}
              >
                <Text style={[styles.buttonText, { color: '#075985' }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.pickerButton]}
                onPress={confirmStartIOSDate}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}

          {!showStartPicker && (
            <Pressable onPress={toggleStartDatepicker}>
              <TextInput
                placeholder="Escolha um horário de início"
                defaultValue={null}
                value={customStartTime.toDateString()}
                // maxLength={30}
                nullMargin
                width={300}
                onChange={(e: null) => setCustomStartTime(e)}
                editable={false}
                onPressIn={toggleStartDatepicker}
              />
            </Pressable>
          )}
        </View>

        <Text style={styles.datetime_title}>Termina:</Text>

        <View style={styles.marginLeft}>
          <RadioInput
            title="Em 24h"
            currentValue={finishTime}
            handleSubmit={() => setFinishTime('')}
            value=""
          />
        </View>
        <View style={styles.wrapper}>
          <View style={[styles.radio_wrapper, styles.marginLeft]}>
            <TouchableOpacity
              onPress={() => {
                setFinishTime(customFinishTime.toDateString());
              }}
              style={[
                styles.radio,
                {
                  backgroundColor: `${finishTime ? 'blue' : 'white'}`,
                },
              ]}
            />
          </View>

          {showFinishPicker && (
            <DateTimePicker
              mode="datetime"
              display="spinner"
              value={customFinishTime}
              onChange={onFinishTimeChange}
              style={styles.datePicker}
              minimumDate={new Date()}
            />
          )}

          {showFinishPicker && Platform.OS === 'ios' && (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.pickerButton,
                  { backgroundColor: '#11182711' },
                ]}
                onPress={toggleFinishDatepicker}
              >
                <Text style={[styles.buttonText, { color: '#075985' }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.pickerButton]}
                onPress={confirmFinishIOSDate}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}

          {!showFinishPicker && (
            <Pressable onPress={toggleFinishDatepicker}>
              <TextInput
                placeholder="Escolha um horário de término"
                defaultValue={null}
                value={customFinishTime.toDateString()}
                // maxLength={30}
                nullMargin
                width={300}
                onChange={(e: null) => setCustomFinishTime(e)}
                editable={false}
                onPressIn={toggleFinishDatepicker}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.private_container}>
          <Text style={styles.private_title}>Evento Privado</Text>
          <View style={styles.private_switch}>
            <Switch
              onValueChange={() => setPrivacy(prev => !prev)}
              value={privacy}
            />
          </View>
        </View>
        <Text style={styles.private_description}>
          {privacy ? 'Seu evento está privado' : 'Seu evento está público'}
        </Text>

        <View style={styles.confirm_button_wrapper}>
          <Button
            onPress={handleSubmit(handleRequireds)}
            title="Continuar"
            type="blue"
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default CreateEventRequireds;
