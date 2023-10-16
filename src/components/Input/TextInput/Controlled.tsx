import { Control, FieldValues, FieldError, Controller } from 'react-hook-form';
import { Text } from '@components/Text';
import { ITextInputProps, TextInput } from '.';
import styles from './styles';

type IControlledTextInputProps = ITextInputProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues>;
  name: string;
  error?: FieldError;
};

export function ControlledTextInput({
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
          <TextInput onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}
