import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CardEmoji from '@components/Card/Emoji';
import styles from './styles';

const EmojisReceived = ({ navigation }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    setEmojis([
      {
        user: {
          id: 1,
          picture: '',
          username: 'username',
          name: 'Nome de usuário',
          friendship: false,
        },
      },
      {
        user: {
          id: 2,
          picture: '',
          username: 'username2',
          name: 'Nome de usuário2',
          friendship: true,
        },
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <ScrollView
            style={styles.emojis}
            showsVerticalScrollIndicator={false}
          >
            {emojis &&
              emojis.map(emoji => (
                <CardEmoji
                  navigation={navigation}
                  key={emoji.id}
                  emoji={emoji}
                />
              ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default EmojisReceived;
