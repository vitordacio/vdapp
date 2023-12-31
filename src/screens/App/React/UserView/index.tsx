import React from 'react';

import { Button } from '@components/Button';
import { AppView, View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { Text } from '@components/Text';
import CardUserInfo from '@components/Card/User/Info';
import { formatDate } from '@utils/formaters';
import styles from './styles';

const ReactUserView: React.FC<AppProps> = ({ navigation, route }) => {
  const { emoji, receiver, message, created_at } = route.params.react.react;

  return (
    <AppView>
      <CardUserInfo
        user={receiver}
        route={route}
        navigation={navigation}
        goBack={true}
      />
      <View style={[styles.container_info, styles.container_title]}>
        <Text style={styles.title}>Emoji:</Text>
        <Button title={emoji.value} style={{ width: 40 }} />
      </View>
      <View style={[styles.container_info, styles.container_description]}>
        <Text style={styles.title}>Mensagem:</Text>
        <Text style={styles.description}>{message}</Text>
      </View>
      <View style={styles.container_info}>
        <Text style={styles.title}>Data de criação:</Text>
        <Text style={styles.description}>{formatDate(created_at)}</Text>
      </View>
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={() => navigation.push('ReactUserDelete')}
          title="Excluir"
        />
      </View>
    </AppView>
  );
};

export default ReactUserView;
