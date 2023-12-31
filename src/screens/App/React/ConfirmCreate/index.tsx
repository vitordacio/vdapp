import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { AppProps } from '@routes/App/app.routes';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { Text } from '@components/Text';
import { reactService } from '@services/React';
import useMessage from '@contexts/message';
import { IReact } from '@interfaces/react';
import styles from './styles';

const schema = yup.object({
  message: yup.string().max(220, 'A mensagem deve ter no máximo 220 dígitos'),
});

type MessageData = yup.InferType<typeof schema>;

const ReactConfirmCreate: React.FC<AppProps> = ({ navigation, route }) => {
  const { type, emoji, user, event } = route.params.react;
  const { throwInfo, throwError } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmCreate = async (data: MessageData) => {
    let react: IReact;
    setLoading(true);
    try {
      if (type === 'user') {
        react = await reactService.createReactUser({
          user_id: user.id_user,
          emoji_id: emoji.id_emoji,
          message: data.message,
        });
        route.params.user_profile = react.receiver;
      }
      if (type === 'event') {
        react = await reactService.createReactEvent({
          event_id: event.id_event,
          emoji_id: emoji.id_emoji,
          message: data.message,
        });

        route.params.event = react.event;
      }

      throwInfo(`Reação criada com sucesso! ${emoji.value}`);
      setLoading(false);
      navigation.navigate(`${type === 'user' ? 'Profile' : 'Event'}`);
    } catch (error) {
      throwError(error.response.data.message);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Confirmar Reação"
      description="Você pode excluir sua reação a qualquer momento."
    >
      <View style={styles.confirm_button_wrapper}>
        <Button title={emoji.value} style={{ width: 40 }} />
      </View>
      <Text style={styles.message_info}>
        Gostaria de adicionar uma mensagem?
      </Text>
      <ControlledTextInput
        name="message"
        control={control}
        error={errors.message}
        lengthMax={220}
        placeholder="Informe uma mensagem"
      />

      <View style={styles.confirm_button_wrapper}>
        <Button
          onPress={handleSubmit(handleConfirmCreate)}
          title="Confirmar"
          type="blue"
          loading={loading}
        />
      </View>
    </ViewUpdate>
  );
};

export default ReactConfirmCreate;
