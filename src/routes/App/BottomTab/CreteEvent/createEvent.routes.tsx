import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProps } from '@routes/App/app.routes';
import CreateEvent from '@screens/App/CreateEvent';
import CreateEventConfirm from '@screens/App/CreateEvent/EventConfirm';
import CreateEventOptionals from '@screens/App/CreateEvent/EventOptionals';
import CreateEventRequireds from '@screens/App/CreateEvent/EventRequireds';
import { screenOptionsDefault } from '@styles/screenOptions';

const CreateEventStackTab = createNativeStackNavigator();

export const CreateEventRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <CreateEventStackTab.Navigator
      screenOptions={screenOptionsDefault({ title: 'Criar Evento' })}
    >
      <CreateEventStackTab.Screen name="CreateEventScreen">
        {props => <CreateEvent {...props} route={route} />}
      </CreateEventStackTab.Screen>

      <CreateEventStackTab.Screen name="CreateEventRequireds">
        {props => <CreateEventRequireds {...props} route={route} />}
      </CreateEventStackTab.Screen>

      <CreateEventStackTab.Screen name="CreateEventOptionals">
        {props => <CreateEventOptionals {...props} route={route} />}
      </CreateEventStackTab.Screen>

      <CreateEventStackTab.Screen name="CreateEventConfirm">
        {props => <CreateEventConfirm {...props} route={route} />}
      </CreateEventStackTab.Screen>
    </CreateEventStackTab.Navigator>
  );
};

export default CreateEventRoutes;
