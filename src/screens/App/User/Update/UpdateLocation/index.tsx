import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextInput } from '@components/Input/TextInput';
import { Button } from '@components/Button';
import { View } from '@components/View';
import { ViewUpdate } from '@components/View/ViewUpdate';
import { AppProps } from '@routes/App/app.routes';
import { IUpdateLocation } from '@services/User/IUserService';
import styles from '../styles';

const schema = yup.object({
  location: yup.string().max(80, 'A localização deve ter no máximo 80 dígitos'),
});

type LocationFormData = yup.InferType<typeof schema>;

const UpdateLocation: React.FC<AppProps> = ({ navigation, route }) => {
  const { user } = route.params;

  const handleLocation = async (data: LocationFormData) => {
    route.params.updateUserConfirm = {
      name: 'Localização',
      description: 'Tem certeza que deseja mudar a sua localização?',
      type: 'location',
      data: data as IUpdateLocation,
    };
    navigation.push('UpdateUserConfirm');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <ViewUpdate
      name="Localização"
      description="Você pode editar a sua localização a qualquer momento."
    >
      <ControlledTextInput
        name="location"
        control={control}
        icon="map-pin"
        placeholder="Informe sua localização"
        defaultValue={user.location}
        error={errors.location}
        maxLength={80}
      />
      <View style={styles.confirm_button_wrapper}>
        <Button onPress={handleSubmit(handleLocation)} title="Continuar" />
      </View>
    </ViewUpdate>
  );
};

export default UpdateLocation;
