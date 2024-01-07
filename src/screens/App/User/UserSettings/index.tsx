import { AppView, View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';

import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@components/Text';
import { Icon } from '@components/Icon';
import { Pressable } from '@components/Pressable';
import styles from './styles';

const UserSettings: React.FC<AppProps> = ({ navigation }) => {
  return (
    <AppView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Pressable
              style={styles.card}
              onPress={() => navigation.push('ToS')}
            >
              <Text style={[styles.text, styles.text_default]}>
                Termos de Serviço
              </Text>
              <Icon name="chevron" />
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.push('PrivacyPolicy')}
            >
              <Text style={[styles.text, styles.text_default]}>
                Política de Privacidade
              </Text>
              <Icon name="chevron" />
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.push('Suggestion')}
            >
              <Text style={[styles.text, styles.text_default]}>
                Enviar Sugestão
              </Text>
              <Icon name="chevron" />
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.push('Logout')}
            >
              <Text style={[styles.text, styles.text_blue]}>
                Sair / Encerrar Sessão
              </Text>
              <Icon name="chevron" tintColor="#276BC6" />
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() => navigation.push('DeleteUser')}
            >
              <Text style={[styles.text, styles.text_red]}>Excluir Conta</Text>
              <Icon name="chevron" tintColor="#E63C3D" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
};

export default UserSettings;
