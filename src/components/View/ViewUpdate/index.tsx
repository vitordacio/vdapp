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
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
          <AppView {...props}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            {props.children}
          </AppView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

//   /* <ScrollView
//         style={{ flex: 1, backgroundColor: 'green' }}
//         showsVerticalScrollIndicator={false}
//       > */
// }
// {
//   /* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */
// }
