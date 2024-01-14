import Event from '@screens/App/Event';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Custom from '@screens/Custom';
import { screenOptionsDefault } from '@styles/screenOptions';
import { formatEventName } from '@utils/formaters';
import { AppProps } from '@routes/App/app.routes';
import { EventInviteRoutes } from './EventInviteStackTab';
import { EventManageRoutes } from './EventManageStackTab';
import { EventRequestsTopTabRoutes } from './EventRequestsTopTab';
import { EventSettingsRoutes } from './EventSettingsStackTab';
import EventHeaderRight from './EventHeaderRight/HeaderRight';
import { EventMomentsRoutes } from './EventMomentsStackTab';

const EventStackTab = createNativeStackNavigator();

export const EventRoutes: React.FC<AppProps> = ({ navigation, route }) => {
  return (
    <EventStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <EventStackTab.Screen
        name="EventScreen"
        options={{
          headerTitle: formatEventName(route.params.event),
          headerRight: () => (
            <EventHeaderRight navigation={navigation} route={route} />
          ),
        }}
      >
        {props => <Event {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventManage" options={{ headerShown: false }}>
        {props => <EventManageRoutes {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen
        name="EventMoments"
        options={{ headerShown: false }}
      >
        {props => <EventMomentsRoutes {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen
        name="EventRequests"
        options={{ headerTitle: 'Solicitações' }}
      >
        {props => <EventRequestsTopTabRoutes {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventInvite" options={{ headerShown: false }}>
        {props => <EventInviteRoutes {...props} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventInbox" component={Custom} />

      <EventStackTab.Screen
        name="EventSettings"
        options={{ headerShown: false }}
      >
        {props => <EventSettingsRoutes {...props} route={route} />}
      </EventStackTab.Screen>
    </EventStackTab.Navigator>
  );
};
