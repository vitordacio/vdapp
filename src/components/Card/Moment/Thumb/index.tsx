import { Pressable } from '@components/Pressable';
import React from 'react';
import { Image } from 'react-native';
import { IMoment } from '@interfaces/moment';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

const CardMomentThumb: React.FC<
  AppProps & { moment: IMoment; moments: IMoment[] }
> = ({ moment, moments, navigation, route }) => {
  const handleOnPress = () => {
    route.params.event_moments = {
      moments,
      selected_moment: moment,
    };
    return navigation.push('EventMoments');
  };

  return (
    <>
      {moment && (
        <Pressable style={styles.container} onPress={handleOnPress}>
          {moment.thumb_url && (
            <Image
              source={{ uri: moment.thumb_url }}
              style={styles.thumb}
              resizeMode="cover"
            />
          )}
        </Pressable>
      )}
    </>
  );
};

export default CardMomentThumb;
