import React from 'react';
import { AppProps } from '@routes/App/app.routes';
import { Icon } from '@components/Icon';
import { Pressable } from '@components/Pressable';
import styles from './styles';

const EventHeaderRight: React.FC<AppProps> = ({ navigation }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.push('EventSettings')}
    >
      <Icon name="more_vertical" />
    </Pressable>
  );
};

export default EventHeaderRight;
