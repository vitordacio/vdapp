import React, { useState } from 'react';
import { TextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import {
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioInput } from '@components/Input/RadioInput';
import { formatTimeRange } from '@utils/formaters';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

const TestDate: React.FC<AppProps> = () => {
  const currentTime = new Date();
  const currentFinishTime = new Date(currentTime);
  currentFinishTime.setHours(currentTime.getHours() + 24);

  const [startTime, setStartTime] = useState('');
  const [customStartTime, setCustomStartTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [finishTime, setFinishTime] = useState('');
  const [customFinishTime, setCustomFinishTime] = useState(new Date());
  const [showFinishPicker, setShowFinishPicker] = useState(false);

  const [privacy, setPrivacy] = useState(false);

  const handleRequireds = async () => {};

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

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, styles.title]}>
          Informações Obrigatórias
        </Text>
        <Text style={[styles.text, styles.description]}>
          Forneça todas as informações essenciais para o seu evento. Será
          possível alterar as informações fornecidas a qualquer momento.
        </Text>

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

        <View style={styles.hours_container}>
          <Text style={styles.hours_text}>
            {formatTimeRange(currentTime, currentFinishTime)}
          </Text>
        </View>

        <Text style={styles.datetime_title}>startTime{startTime}</Text>
        <Text style={styles.datetime_title}>
          customStartTime.toString(){customStartTime.toString()}
        </Text>
        <Text style={styles.datetime_title}>
          customStartTime.toLocaleString(){customStartTime.toLocaleString()}
        </Text>
        <Text style={styles.datetime_title}>finishTime{finishTime}</Text>
        <Text style={styles.datetime_title}>
          customFinishTime.toString(){customFinishTime.toString()}
        </Text>
        <Text style={styles.datetime_title}>
          customFinishTime.toLocaleString(){customFinishTime.toLocaleString()}
        </Text>

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
            onPress={() => handleRequireds()}
            title="Continuar"
            type="blue"
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default TestDate;
