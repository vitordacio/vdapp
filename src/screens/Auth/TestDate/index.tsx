import React, { useState } from 'react';
import { TextInput } from '@components/Input/TextInput';
import { Text } from '@components/Text';
import { AppView, View } from '@components/View';
import { ScrollView, Pressable, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppProps } from '@routes/App/app.routes';
import DatePicker from 'react-native-date-picker';
import styles from './styles';

const TestDate: React.FC<AppProps> = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDateTime, setFormattedDateTime] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateInline, setDateInline] = useState(new Date());

  const onDateChange = ({ type }, selectedDate: Date) => {
    if (type === 'set') {
      const newDate = selectedDate;
      setStartDate(newDate);

      const newFormattedDateTime = `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
      setFormattedDateTime(newFormattedDateTime);

      if (Platform.OS === 'android') {
        setShowPicker(false);
      }
    } else {
      setShowPicker(false);
    }
  };

  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.datetime_title}>{startDate.toLocaleString()}</Text>

        <View style={styles.wrapper}>
          {showPicker && (
            <>
              <DateTimePicker
                testID="dateTimePicker"
                mode="datetime"
                display="spinner"
                value={startDate}
                onChange={onDateChange}
                style={styles.datePicker}
                minimumDate={new Date()}
              />
              {/* <DateTimePicker
                testID="timePicker"
                mode="time"
                display="spinner"
                value={startDate}
                onChange={onDateChange}
                style={styles.datePicker}
                minimumDate={new Date()}
              /> */}
            </>
          )}

          {!showPicker && (
            <Pressable onPress={() => setShowPicker(true)}>
              <TextInput
                placeholder="Escolha um horário de início"
                defaultValue={null}
                value={formattedDateTime}
                nullMargin
                width={300}
                editable={false}
                onPressIn={() => setShowPicker(true)}
              />
              <TextInput
                placeholder="Escolha um horário de início"
                defaultValue={null}
                value={startDate.toLocaleString()}
                nullMargin
                width={300}
                editable={false}
                onPressIn={() => setShowPicker(true)}
              />
              <TextInput
                placeholder="Escolha um horário de início"
                defaultValue={null}
                value={startDate.toISOString()}
                nullMargin
                width={300}
                editable={false}
                onPressIn={() => setShowPicker(true)}
              />
              <TextInput
                placeholder="Escolha um horário de início"
                defaultValue={null}
                value={startDate.toUTCString()}
                nullMargin
                width={300}
                editable={false}
                onPressIn={() => setShowPicker(true)}
              />
              <TextInput
                placeholder="Escolha um horário de início"
                defaultValue={null}
                value={startDate.toDateString()}
                nullMargin
                width={300}
                editable={false}
                onPressIn={() => setShowPicker(true)}
              />
              <TextInput
                placeholder="Escolha um horário de início"
                defaultValue={null}
                value={startDate.toString()}
                nullMargin
                width={300}
                editable={false}
                onPressIn={() => setShowPicker(true)}
              />
            </Pressable>
          )}
        </View>

        <>
          <Text style={styles.datetime_title}>{date.toLocaleString()}</Text>
          <Button title="Open" onPress={() => setOpen(true)} />
          <DatePicker
            mode="datetime"
            modal
            open={open}
            date={date}
            onConfirm={currentDate => {
              setOpen(false);
              setDate(currentDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>

        <>
          <Text style={styles.datetime_title}>
            {dateInline.toLocaleString()}
          </Text>
          <DatePicker
            mode="datetime"
            date={dateInline}
            onDateChange={setDateInline}
          />
        </>
      </ScrollView>
    </AppView>
  );
};

export default TestDate;
