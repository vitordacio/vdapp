import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import assets from '@assets/index';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IEvent } from '@interfaces/event';
import styles from './styles';

const assetMapping: Record<string, ImageSourcePropType> = {
  auditorium: assets.auditorium,
  beach: assets.beach,
  birthday: assets.birthday,
  boat: assets.boat,
  culinary: assets.culinary,
  exercise: assets.exercise,
  games: assets.games,
  meeting: assets.meeting,
  nature: assets.nature,
  party: assets.party,
  table: assets.table,
};

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  event: IEvent;
};

const CardEventSearch = ({ event, navigation }: CardProps) => {
  // const { name, location, cover_photo, type, author, status } = event;
  const {
    name,
    location,
    cover_photo,
    date,
    time,
    finish_time,
    finish_date,
    type,
  } = event;

  return (
    <>
      {event && (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.push('Event', { event })}
        >
          {cover_photo && (
            <Image
              source={{ uri: cover_photo }}
              style={styles.cover_photo}
              resizeMode="cover"
            />
          )}
          <View style={styles.container_data}>
            <View style={styles.data}>
              {name && (
                <View style={styles.data_text}>
                  <Image
                    style={styles.icon}
                    source={assetMapping[type.name]}
                    resizeMode="contain"
                    tintColor="#fff"
                  />
                  <Text style={styles.name}>{name}</Text>
                </View>
              )}
              {location && (
                <View style={styles.data_text}>
                  <ImageBackground
                    style={styles.icon}
                    source={assets.location}
                    resizeMode="contain"
                    tintColor="#fff"
                  />
                  <Text style={styles.location}>{location}</Text>
                </View>
              )}
              {date && (
                <View style={styles.data_text}>
                  <ImageBackground
                    style={styles.icon}
                    source={assets.clock}
                    resizeMode="contain"
                    tintColor="#fff"
                  />
                  <Text style={styles.location}>{date}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardEventSearch;
