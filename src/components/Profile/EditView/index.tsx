import React from 'react';
import { Text } from '@components/Text';
import { ViewProps } from 'react-native';
import { AppView } from '@components/View';
import styles from './styles';

interface IEditViewProps extends ViewProps {
  name: string;
  description?: string;
}

export const EditView: React.FC<IEditViewProps> = ({
  name,
  description,
  ...props
}) => {
  return (
    <AppView {...props} style={{ position: 'relative' }}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      {props.children}
    </AppView>
  );
};
