import { AppView, View } from '@components/View';
import { Text } from '@components/Text';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView } from 'react-native';
import { IEvent } from '@interfaces/event';
import { Button } from '@components/Button';
import styles from './styles';

type EventProps = NativeStackScreenProps<ParamListBase> & {
  paramEvent: IEvent;
};

const ManageEvent: React.FC<EventProps> = ({ navigation }) => {
  // const [canSeeContent, setCanSeeContent] = useState<boolean>();

  // useEffect(() => {
  // }, []);

  return (
    <AppView
      style={{
        padding: 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text>TESTE</Text>
          <Button
            title="Editar Evento"
            onPress={() => navigation.push('UpdateEvent')}
          />
        </View>
      </ScrollView>
    </AppView>
  );
};

export default ManageEvent;
