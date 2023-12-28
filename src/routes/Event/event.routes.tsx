import Event from '@screens/App/Event';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Custom from '@screens/Custom';
import { screenOptionsDefault } from '@styles/screenOptions';
import { formatEventName } from '@utils/formaters';
import { AppProps } from '@routes/App/app.routes';
import { EventInviteRoutes } from './EventInviteStackTab';
import { EventManageRoutes } from './EventManageStackTab';
import { EventRequestsTopTabRoutes } from './EventRequestsTopTab';

const EventStackTab = createNativeStackNavigator();

export const EventRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EventStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <EventStackTab.Screen
        name="EventScreen"
        options={{ headerTitle: formatEventName(route.params.event) }}
      >
        {props => <Event {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventManage" options={{ headerShown: false }}>
        {props => <EventManageRoutes {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventRequests">
        {props => <EventRequestsTopTabRoutes {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventInvite" options={{ headerShown: false }}>
        {props => <EventInviteRoutes {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventInbox" component={Custom} />
      <EventStackTab.Screen name="EventLists" component={Custom} />
    </EventStackTab.Navigator>
  );
};