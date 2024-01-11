import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import EventRequestsPending from '@screens/App/Event/EventRequests/Pending';
import EventRequestsReviwed from '@screens/App/Event/EventRequests/Reviwed';
import { screenOptionsTopDefault } from '@styles/screenOptions';

const EventRequestsTopTab = createMaterialTopTabNavigator();

export const EventRequestsTopTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <EventRequestsTopTab.Navigator
      screenOptions={() => screenOptionsTopDefault({})}
    >
      <EventRequestsTopTab.Screen
        name="EventRequestsPending"
        options={{
          tabBarLabel: 'Pendentes',
        }}
      >
        {props => <EventRequestsPending {...props} route={route} />}
      </EventRequestsTopTab.Screen>

      <EventRequestsTopTab.Screen
        name="EventRequestsReviwed"
        options={{
          tabBarLabel: 'Revisados',
        }}
      >
        {props => <EventRequestsReviwed {...props} route={route} />}
      </EventRequestsTopTab.Screen>
    </EventRequestsTopTab.Navigator>
  );
};
