import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from '@components/View';
import { Text } from '@components/Text';
import assets from '@assets/index';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IEvent } from '@interfaces/event';
import { formatTimeRange } from '@utils/formaters';
import { LineX } from '@components/Line';
import useAuth from '@contexts/auth';
import styles from './styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  event: IEvent;
};

const CardEventProfile = ({ event, navigation }: CardProps) => {
  const { user } = useAuth();
  const {
    name,
    location,
    cover_photo,
    status,
    start_time,
    finish_time,
    type,
    participating_count,
    emojis_count,
  } = event;

  const hours = formatTimeRange(
    new Date(start_time),
    new Date(finish_time),
    user.locale,
  );

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
            {status === 'ongoing' && (
              <LottieView
                style={styles.status}
                source={assets.ongoing}
                autoPlay
                loop
              />
            )}

            <View style={styles.container_event}>
              {name && (
                <View style={styles.data_text}>
                  <Image
                    style={styles.icon}
                    source={assets[type.name]}
                    resizeMode="contain"
                    tintColor="#fff"
                  />
                  <Text style={[styles.text_default_color, styles.text_large]}>
                    {name}
                  </Text>
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
                  <Text style={[styles.text_default_color, styles.text_medium]}>
                    {location}
                  </Text>
                </View>
              )}
              {hours && (
                <View style={styles.data_text}>
                  <ImageBackground
                    style={styles.icon}
                    source={assets.clock}
                    resizeMode="contain"
                    tintColor="#fff"
                  />
                  <Text style={[styles.text_gray_color, styles.text_medium]}>
                    {hours}
                  </Text>
                </View>
              )}
            </View>

            <LineX />

            <View style={styles.container_counts}>
              <View style={styles.data_counts}>
                <ImageBackground
                  style={styles.icon}
                  source={assets.smile}
                  resizeMode="contain"
                  tintColor="#fff"
                />
                <Text style={[styles.text_default_color, styles.text_medium]}>
                  {emojis_count}
                </Text>
              </View>

              <View style={styles.data_counts}>
                <ImageBackground
                  style={styles.icon}
                  source={assets.users}
                  resizeMode="contain"
                  tintColor="#fff"
                />
                <Text style={[styles.text_default_color, styles.text_medium]}>
                  {participating_count}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CardEventProfile;
