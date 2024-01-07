import { Pressable } from '@components/Pressable';
import React from 'react';
import { Image } from 'react-native';
import { IMoment } from '@interfaces/moment';
import useMessage from '@contexts/message';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

const CardMomentThumb: React.FC<AppProps & { moment: IMoment }> = ({
  moment,
  // navigation,
  // route,
}) => {
  const { throwInfo } = useMessage();

  const handleOnPress = () => {
    throwInfo('on press');
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
