import React from 'react';
import { ViewProps } from 'react-native';
import { View } from '@components/View';
import { Icon } from '@components/Icon';
import { Text } from '@components/Text';
import styles from './styles';

export const PrivateContentView = (props: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      <Text style={styles.description}>Conteúdo Privado</Text>
      <View style={styles.content}>
        <Icon name="lock" size={75} description={true} />
      </View>
    </View>
  );
};
