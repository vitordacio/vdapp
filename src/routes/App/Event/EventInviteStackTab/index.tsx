import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventInvite from '@screens/App/Event/EventInvite';
import EventInviteConfirm from '@screens/App/Event/EventInvite/EventInviteConfirm';
import { EventProps } from '../event.routes';

const EventInviteStackTab = createNativeStackNavigator();

export const EventInviteRoutes: React.FC<EventProps> = ({
  route,
  onUpdateEvent,
}) => {
  return (
    <EventInviteStackTab.Navigator
      screenOptions={{
        headerTitle: 'Convidar',
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
      <EventInviteStackTab.Screen name="EventInviteScreen">
        {props => (
          <EventInvite {...props} route={route} onUpdateEvent={onUpdateEvent} />
        )}
      </EventInviteStackTab.Screen>

      <EventInviteStackTab.Screen name="EventInviteConfirm">
        {props => (
          <EventInviteConfirm
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </EventInviteStackTab.Screen>
    </EventInviteStackTab.Navigator>
  );
};
