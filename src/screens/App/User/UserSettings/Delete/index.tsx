import { AppView, View } from '@components/View';
import React, { useState } from 'react';
import { AppProps } from '@routes/App/app.routes';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import useMessage from '@contexts/message';
import { userService } from '@services/User';
import { storageService } from '@services/Storage';
import useAuth from '@contexts/auth';
import styles from '../styles';

const DeleteUser: React.FC<AppProps> = ({ route }) => {
  const { setUser } = useAuth();
  const { throwInfo, throwError } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await userService.deleteUserSelf();

      throwInfo('Usuário excluído com sucesso');
      setLoading(false);
      route.params = null;
      storageService.removeItem('@Auth:data');
      setUser(null);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  return (
    <AppView>
      <Text style={styles.title}>Confirmar exclusão</Text>
      <Text style={styles.description}>
        Ao excluir sua conta, as informações associadas serão permanentemente
        perdidas e não será possível recuperar o acesso novamente no futuro.
      </Text>
      <Text style={styles.description}>
        Tem certeza que deseja excluir sua conta?
      </Text>
      <View style={styles.button_wrapper}>
        <Button
          title="Excluir Conta"
          type="red"
          onPress={handleDelete}
          loading={loading}
        />
      </View>
    </AppView>
  );
};

export default DeleteUser;
