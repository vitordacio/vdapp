import { AppView, View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';

import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@components/Text';
import { Icon } from '@components/Icon';
import { Pressable } from '@components/Pressable';
import styles from './styles';

const ProfileSettings: React.FC<AppProps> = ({ navigation }) => {
  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Pressable
              style={styles.card}
              onPress={() => navigation.push('ProfileReport')}
            >
              <Text style={[styles.text, styles.text_default]}>Reportar</Text>
              <Icon name="chevron" />
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.push('ProfileBlock')}
            >
              <Text style={[styles.text, styles.text_default]}>
                Bloquear / Desbloquear
              </Text>
              <Icon name="chevron" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default ProfileSettings;
