import React from 'react';
import { SwitchProps, Switch as NativeSwitch } from 'react-native';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { Control, FieldValues, FieldError, Controller } from 'react-hook-form';
import styles from './styles';

export type ISwitchProps = SwitchProps & {
  onChange?: (e: boolean) => void;
  value?: boolean;
  title?: string;
};

const SwitchInput = ({ title, value, onChange, ...rest }: ISwitchProps) => {
  return (
    <>
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.switch}>
          <NativeSwitch
            // trackColor={{
            //   false: `${colors.GRAY_DESCRIPTION}`,
            //   true: `${colors.BLUE_BUTTON}`,
            // }}
            // thumbColor="yellow"
            onValueChange={onChange}
            value={value}
            {...rest}
          />
        </View>
      </View>
    </>
  );
};

type IControlledTextInputProps = ISwitchProps & {
  control: Control<FieldValues>;
  name: string;
  error?: FieldError;
};

export function ControlledSwitchInput({
  control,
  name,
  error,
  ...rest
}: IControlledTextInputProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <SwitchInput onChange={onChange} value={value} {...rest} />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}
