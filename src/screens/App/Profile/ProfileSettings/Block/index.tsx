import { AppView, View } from '@components/View';
import React, { useEffect, useState } from 'react';
import { AppProps } from '@routes/App/app.routes';
import { Text } from '@components/Text';
import { Button } from '@components/Button';
import useMessage from '@contexts/message';
import { blockService } from '@services/Block';
import { IBlock } from '@interfaces/block';
import { Loading } from '@components/View/Loading';
import styles from '../styles';

type BlockStatus = {
  title: string;
  description: string;
  buttonTitle: string;
  buttonType: string;
  block: IBlock | undefined;
};

const ProfileBlock: React.FC<AppProps> = ({ navigation, route }) => {
  const { user_profile } = route.params;
  const { throwInfo, throwError } = useMessage();

  const [status, setStatus] = useState<BlockStatus>();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBlock = async () => {
    setLoading(true);
    let message: string;
    try {
      if (!status.block) {
        await blockService.createBlock(user_profile.id_user);
        message = 'Usuário bloqueado com sucesso';
      } else {
        await blockService.deleteBlock(user_profile.id_user);
        message = 'Usuário dssbloqueado com sucesso';
      }
    } catch (error) {
      throwError(error.response.data.message);
    }

    if (message) throwInfo(message);
    navigation.goBack();
  };

  const fetchBlock = async (user_id: string) => {
    const blockStatus: BlockStatus = {
      title: '',
      description: '',
      buttonTitle: '',
      buttonType: '',
      block: undefined,
    };

    try {
      const userBlock = await blockService.findBlock(user_id);

      if (!userBlock) {
        blockStatus.title = 'Bloquear usuário';
        blockStatus.description = `Tem certeza que deseja bloquear ${user_profile.name}?`;
        blockStatus.buttonTitle = 'Bloquear Usuário';
        blockStatus.buttonType = 'red';
      } else {
        blockStatus.title = 'Desbloquear usuário';
        blockStatus.description = `Tem certeza que deseja desbloquear ${user_profile.name}?`;
        blockStatus.buttonTitle = 'Desbloquear Usuário';
        blockStatus.buttonType = 'blue';
      }

      setStatus(blockStatus);
    } catch (error) {
      throwError(error.response.data.message);
    }

    setShowLoader(false);
  };

  useEffect(() => {
    fetchBlock(user_profile.id_user);
  }, []);

  return (
    <AppView>
      {!showLoader && status ? (
        <>
          <Text style={styles.title}>{status.title}</Text>
          <Text style={styles.description}>
            Ao bloquear um usuário, você impede que ele interaja com você, não
            recebendo mais suas mensagens ou notificações, proporcionando um
            ambiente mais controlado e personalizado. O usuário bloqueado não
            será informado sobre o bloqueio.
          </Text>
          <Text style={styles.description}>{status.description}</Text>
          <View style={styles.button_wrapper}>
            <Button
              title={status.buttonTitle}
              type={status.buttonType}
              onPress={handleBlock}
              loading={loading}
            />
          </View>
        </>
      ) : (
        <Loading size={48} />
      )}
    </AppView>
  );
};

export default ProfileBlock;
