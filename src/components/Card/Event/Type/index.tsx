import React, { useEffect, useState } from 'react';
import { Text } from '@components/Text';
import assets from '@assets/index';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { IEventType } from '@interfaces/types';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

type CardProps = AppProps & {
  eventType: IEventType;
  index: number;
};

const CardEventType = ({ eventType, index, navigation, route }: CardProps) => {
  const { name } = eventType;
  const [verified, setVerified] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [aplyMargin, setAplyMargin] = useState<boolean>(false);
  const [color, setColor] = useState<string>();

  const handleGoToRequireds = () => {
    route.params.createEvent = {
      eventType,
    };
    return navigation.push('CreateEventRequireds');
  };

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
    if (name === 'exercise') handleName = 'Exercício Físico';
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
          onPress={handleGoToRequireds}
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
