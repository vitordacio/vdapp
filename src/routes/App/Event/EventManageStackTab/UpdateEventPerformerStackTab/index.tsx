import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptionsDefault } from '@styles/screenOptions';
import { AppProps } from '@routes/App/app.routes';
import UpdateEventPerformerScreen from '@screens/App/Event/EventManage/Update/UpdateEventPerformer';
import EventDeletePerformer from '@screens/App/Event/EventManage/Update/UpdateEventPerformer/EventDeletePerformer';
import EventSelectPerformer from '@screens/App/Event/EventManage/Update/UpdateEventPerformer/EventSelectPerformer';
import EventCreatePerformer from '@screens/App/Event/EventManage/Update/UpdateEventPerformer/EventCreatePerformer';

const UpdateEventPerformerStackTab = createNativeStackNavigator();

export const UpdateEventPerformerRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <UpdateEventPerformerStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Artistas' })}
    >
      <UpdateEventPerformerStackTab.Screen name="UpdateEventPerformerScreen">
        {props => <UpdateEventPerformerScreen {...props} route={route} />}
      </UpdateEventPerformerStackTab.Screen>

      <UpdateEventPerformerStackTab.Screen name="EventSelectPerformer">
        {props => <EventSelectPerformer {...props} route={route} />}
      </UpdateEventPerformerStackTab.Screen>

      <UpdateEventPerformerStackTab.Screen name="EventCreatePerformer">
        {props => <EventCreatePerformer {...props} route={route} />}
      </UpdateEventPerformerStackTab.Screen>

      <UpdateEventPerformerStackTab.Screen name="EventDeletePerformer">
        {props => <EventDeletePerformer {...props} route={route} />}
      </UpdateEventPerformerStackTab.Screen>
    </UpdateEventPerformerStackTab.Navigator>
  );
};
