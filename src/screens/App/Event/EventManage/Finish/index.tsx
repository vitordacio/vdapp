import { AppView, View } from '@components/View';
import React from 'react';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import { AppProps } from '@routes/App/app.routes';
import styles from './styles';

const FinishEvent: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;

  const handleFinish = () => {
    return navigation.goBack();
  };

  return (
    <AppView>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>Confirmar finalização</Text>
          <Text style={styles.description}>
            Ao finalizar um evento as informações são computadas para o sistema
            de ranking, incluindo a mudança da data de término para o momento
            atual.
          </Text>
          <Text style={styles.alert}>
            Não é possível alterar o horário de um evento finalizado.
          </Text>
        </View>
        <View style={styles.button_wrapper}>
          <Button title="Finalizar" type="blue" onPress={handleFinish} />
        </View>
      </View>
    </AppView>
  );
};

export default FinishEvent;
