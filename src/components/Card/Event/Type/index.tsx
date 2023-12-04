import React, { useEffect, useState } from 'react';
import { Text } from '@components/Text';

import assets from '@assets/index';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IEventType } from '@interfaces/types';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  eventType: IEventType;
  index: number;
};

const CardEventType = ({ eventType, index, navigation }: CardProps) => {
  const { name } = eventType;
  const [verified, setVerified] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [aplyMargin, setAplyMargin] = useState<boolean>(false);
  const [color, setColor] = useState<string>();

  useEffect(() => {
    let handleVerified = false;
    let handleColor = '#FFFFFF';
    let handleName = '';

    if (name === 'party') {
      handleVerified = true;
      handleColor = '#F2C94D';
      handleName = 'Festa';
    }

    if (name === 'auditorium') handleName = 'Auditório';
    if (name === 'beach') handleName = 'Praia';
    if (name === 'birthday') handleName = 'Aniversário';
    if (name === 'boat') handleName = 'Barco';
    if (name === 'culinary') handleName = 'Culinária';
    if (name === 'exercise') handleName = 'Exercício';
    if (name === 'fishing') handleName = 'Pesca';
    if (name === 'games') handleName = 'Jogos';
    if (name === 'meeting') handleName = 'Reunião';
    if (name === 'moon') handleName = 'Lual';
    if (name === 'nature') handleName = 'Natureza';
    if (name === 'pool') handleName = 'Piscina';
    if (name === 'table') handleName = 'Tomar Uma';

    const handleMargin = index === 0 || index % 2 === 0;
    setAplyMargin(handleMargin);

    setVerified(handleVerified);
    setColor(handleColor);
    setColor(handleColor);
    setCustomName(handleName);
  }, []);

  return (
    <>
      {eventType && (
        <TouchableOpacity
          style={[styles.container, aplyMargin && { marginRight: 14 }]}
          onPress={() => navigation.push('CreateEventRequireds', { eventType })}
        >
          {verified && (
            <ImageBackground
              style={styles.verified}
              source={assets.verified}
              resizeMode="contain"
              tintColor={color}
            />
          )}
          <ImageBackground
            style={styles.icon}
            source={assets[name]}
            resizeMode="contain"
            tintColor={color}
          />
          <Text style={[styles.text, { color }]}>{customName || name}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardEventType;