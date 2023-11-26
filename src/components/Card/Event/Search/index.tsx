import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IEvent } from '@interfaces/event';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  event: IEvent;
};

const CardEventSearch = ({ event, navigation }: CardProps) => {
  // const { name, location, cover_photo, author, status } = event;
  const { name, location, cover_photo } = event;

  return (
    <>
      {event && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.push('Event', { event })}
        >
          {cover_photo && (
            <View style={styles.cover_photo}>
              <Image
                source={{ uri: cover_photo }}
                style={{ flex: 1, resizeMode: 'cover' }}
              />
            </View>
          )}
          <View style={styles.container_data}>
            <View style={styles.data}>
              {name && <Text style={styles.name}>{name}</Text>}
              {location && <Text style={styles.username}>{location}</Text>}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardEventSearch;
