import React, { useState } from 'react';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { reactService } from '@services/React';
import useMessage from '@contexts/message';
import styles from './styles';

const ReactConfirmDelete: React.FC<AppProps> = ({ navigation, route }) => {
  const { type, react, user, event } = route.params.react;
  const { throwInfo, throwError } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await reactService.deleteReact(react.id_react);
      throwInfo('Reação excluída com sucesso.');

      if (type === 'user') route.params.user_profile = user;
      if (type === 'event') route.params.event = event;

      setLoading(false);
      navigation.navigate(`${type === 'user' ? 'Profile' : 'Event'}`);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  return (
    <ViewUpdate
      name="Confirmar"
      description="Tem certeza que deseja excluir sua reação?"
    >
      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleConfirmDelete}
          title="Confirmar Exclusão"
          type="red"
          loading={loading}
        />
      </View>
    </ViewUpdate>
  );
};

export default ReactConfirmDelete;
