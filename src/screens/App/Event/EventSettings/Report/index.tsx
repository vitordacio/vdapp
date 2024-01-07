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
import { reportService } from '@services/Report';
import styles from '../styles';

const schema = yup.object({
  message: yup.string().required('Informe uma mensagem'),
});

type ReportFormData = yup.InferType<typeof schema>;

const EventReport: React.FC<AppProps> = ({ navigation, route }) => {
  const { event } = route.params;
  const { throwInfo, throwError } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleReport = async (data: ReportFormData) => {
    setLoading(true);
    try {
      await reportService.createReportEvent({
        event_id: event.id_event,
        message: data.message,
      });

      throwInfo('Denúncia enviada com sucesso!');
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
  } = useForm<ReportFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Enviar Denúncia"
      description="Você pode enviar quantas denúncias desejar."
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
          onPress={handleSubmit(handleReport)}
          title="Enviar"
          type="blue"
          loading={loading}
        />
      </View>
    </ViewUpdate>
  );
};

export default EventReport;
