import { AppView, View } from '@components/View';
import React from 'react';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import { AppProps } from '@routes/App/app.routes';
import useAuth from '@contexts/auth';
import { storageService } from '@services/Storage';
import styles from '../styles';

const Logout: React.FC<AppProps> = ({ route }) => {
  const { setUser } = useAuth();

  const handleLogout = () => {
    route.params = null;
    storageService.removeItem('@Auth:data');
    setUser(null);
  };

  return (
    <AppView>
      <Text style={styles.title}>Confirmar encerramento da sessão</Text>
      <Text style={styles.description}>
        Ao encerrar a sessão, a desconexão ocorrerá e não haverá mais acesso à
        conta ou informações pessoais, garantindo a segurança da privacidade. É
        possível realizar o login novamente a qualquer momento para acessar a
        conta novamente.
      </Text>
      <View style={styles.button_wrapper}>
        <Button title="Sair" type="blue" onPress={handleLogout} />
      </View>
    </AppView>
  );
};

export default Logout;
