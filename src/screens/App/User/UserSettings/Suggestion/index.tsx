import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { AppProps } from '@routes/App/app.routes';
import { View } from '@components/View';
import { ViewUpdate } from '@components/View/ViewUpdate';
import useMessage from '@contexts/message';
import { suggestionService } from '@services/Suggestion';
import styles from '../styles';

const schema = yup.object({
  message: yup.string().required('Informe uma mensagem'),
});

type SuggestionFormData = yup.InferType<typeof schema>;

const Suggestion: React.FC<AppProps> = ({ navigation }) => {
  const { throwInfo, throwError } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSuggestion = async (data: SuggestionFormData) => {
    setLoading(true);
    try {
      await suggestionService.createSuggestion({
        message: data.message,
      });

      throwInfo('Sugestão criada com sucesso!');
      navigation.goBack();
    } catch (error) {
      throwError(error.response.data.message);
    }
    setLoading(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SuggestionFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Criar sugestão"
      description="Você pode enviar quantas sugestões desejar."
    >
      <ControlledTextInput
        name="message"
        control={control}
        placeholder="Informe uma mensagem"
        error={errors.message}
        lengthMax={460}
      />
      <View style={styles.button_wrapper}>
        <Button
          onPress={handleSubmit(handleSuggestion)}
          title="Enviar"
          type="blue"
          loading={loading}
        />
      </View>
    </ViewUpdate>
  );
};

export default Suggestion;
