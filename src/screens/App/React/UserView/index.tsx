import React from 'react';
import { Button } from '@components/Button';
import { AppView, View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { Text } from '@components/Text';
import { formatDate } from '@utils/formaters';
import { Picture } from '@components/Picture';
import styles from './styles';

const ReactUserView: React.FC<AppProps> = ({ navigation, route }) => {
  const { user: self } = route.params;
  const { emoji, receiver, message, created_at } = route.params.react.react;

  return (
    <AppView>
      <View style={styles.container_user}>
        <Picture card={true} picture={receiver.picture} />
        <View style={styles.content_user}>
          {receiver.name && <Text style={styles.name}>{receiver.name}</Text>}
          {receiver.username && (
            <Text style={styles.username}>@{receiver.username}</Text>
          )}
        </View>
      </View>

      <View style={styles.container_emoji}>
        <Button title={emoji.value} maxWidth={40} />
      </View>

      {message && <Text style={styles.message}>{message}</Text>}

      <Text style={styles.created_at}>
        {formatDate(created_at, self.locale)}
      </Text>

      <View style={[styles.button_wrapper, styles.button_back]}>
        <Button
          onPress={() => navigation.goBack()}
          title="Voltar"
          type="blue"
        />
      </View>

      <View style={styles.button_wrapper}>
        <Button
          onPress={() => navigation.push('ReactUserDelete')}
          title="Excluir"
        />
      </View>
    </AppView>
  );
};

export default ReactUserView;
