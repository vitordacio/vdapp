import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventRequestsPending from '@screens/App/Event/EventRequests/Pending';
import EventRequestsReviwed from '@screens/App/Event/EventRequests/Reviwed';
import { screenOptionsTopDefault } from '@styles/screenOptions';
import { EventProps } from '../event.routes';

const EventRequestsTopTab = createMaterialTopTabNavigator();

export const EventRequestsTopTabRoutes: React.FC<EventProps> = ({
  route,
  onUpdateEvent,
}) => {
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
        {props => (
          <EventRequestsPending
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </EventRequestsTopTab.Screen>

      <EventRequestsTopTab.Screen
        name="EventRequestsReviwed"
        options={{
          tabBarLabel: 'Revisados',
        }}
      >
        {props => (
          <EventRequestsReviwed
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </EventRequestsTopTab.Screen>
    </EventRequestsTopTab.Navigator>
  );
};
