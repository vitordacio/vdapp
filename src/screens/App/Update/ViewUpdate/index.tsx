import React from 'react';
import { Text } from '@components/Text';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';
import { AppView } from '@components/View';
import colors from '@styles/colors';
import styles from './styles';

interface IUpdateViewProps extends ViewProps {
  name: string;
  description?: string;
}

export const ViewUpdate: React.FC<IUpdateViewProps> = ({
  name,
  description,
  ...props
}) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: `${colors.VIEW_BACKGROUND}` }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <AppView {...props} style={{ position: 'relative' }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            {props.children}
          </AppView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
