import React from 'react';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Feather } from '@expo/vector-icons';
import { Button } from '@components/Button';
import { Pressable } from '@components/Pressable';

import styles from './styles';

interface IViewPrivateProps {
  type: 'info' | 'warning';
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  is_private: boolean;
}

export const ViewPrivate: React.FC<IViewPrivateProps> = ({
  setConfirm,
  type,
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
          Esssa conta é {`${is_private ? 'privada' : 'pública'}`}.
        </Text>
        <Text style={styles.description}>
          {type === 'info'
            ? `${
                is_private
                  ? 'Quando uma conta é privada, somente os seus amigos podem ver detalhes do perfil e suas publicações.'
                  : 'Quando uma conta é pública, seu perfil e publicações podem ser vistos por todos dentro do app.'
              }`
            : 'Siga esta conta para ver mais detalhes'}
        </Text>
        <Button type="dark" title="Ok" onPress={() => setConfirm(false)} />
      </View>
    </Pressable>
  );
};
