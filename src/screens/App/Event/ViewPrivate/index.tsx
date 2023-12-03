import React from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { Pressable } from '@components/Pressable';

import styles from './styles';

interface IViewPrivateProps {
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  is_private: boolean;
}

export const ViewPrivate: React.FC<IViewPrivateProps> = ({
  setConfirm,
  is_private,
}) => {
  return (
    <Pressable style={styles.container} onPress={() => setConfirm(false)}>
      <View style={styles.content}>
        <View style={styles.close_content}>
          <Pressable onPress={() => setConfirm(false)}>
            <Feather name="x" size={30} color="black" />
          </Pressable>
        </View>
        <Text style={styles.title}>
          Esse evento é {`${is_private ? 'privado' : 'público'}`}.
        </Text>
        <Text style={styles.description}>
          {is_private
            ? 'Quando um evento é privado, ...'
            : 'Quando um evento é público, ...'}
        </Text>
        <Button type="dark" title="Ok" onPress={() => setConfirm(false)} />
      </View>
    </Pressable>
  );
};
