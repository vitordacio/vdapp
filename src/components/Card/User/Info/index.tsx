import { View } from '@components/View';
import { Text } from '@components/Text';
import React from 'react';
import { Picture } from '@components/Picture';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { IUser } from '@interfaces/user';
import { Pressable } from '@components/Pressable';
import styles from '../styles';

type CardProps = Partial<NativeStackScreenProps<ParamListBase>> & {
  user: IUser;
  onPress?: () => void;
};

const CardUserInfo = ({ user, onPress }: CardProps) => {
  const { username, name, picture } = user;

  return (
    <>
      {user && (
        <Pressable style={styles.container} onPress={onPress}>
          <Picture card={true} picture={picture} />
          <View style={styles.content}>
            {name && <Text style={styles.name}>{name}</Text>}
            {username && <Text style={styles.username}>@{username}</Text>}
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardUserInfo;
