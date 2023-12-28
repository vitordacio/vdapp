import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEvent from '@screens/App/CreateEvent';
import CreateEventConfirm from '@screens/App/CreateEvent/EventConfirm';
import CreateEventOptionals from '@screens/App/CreateEvent/EventOptionals';
import CreateEventRequireds from '@screens/App/CreateEvent/EventRequireds';

const CreateEventStackTab = createNativeStackNavigator();

export const CreateEventRoutes: React.FC = () => {
  return (
    <CreateEventStackTab.Navigator
      screenOptions={{
        headerTitle: 'Criar Evento',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
    >
      <CreateEventStackTab.Screen
        name="CreateEventScreen"
        component={CreateEvent}
      />
      <CreateEventStackTab.Screen
        name="CreateEventRequireds"
        component={CreateEventRequireds}
      />
      <CreateEventStackTab.Screen
        name="CreateEventOptionals"
        component={CreateEventOptionals}
      />
      <CreateEventStackTab.Screen
        name="CreateEventConfirm"
        component={CreateEventConfirm}
      />
    </CreateEventStackTab.Navigator>
  );
};

export default CreateEventRoutes;
