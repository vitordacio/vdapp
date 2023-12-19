import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventManage from '@screens/App/Event/EventManage';
import { screenOptionsDefault } from '@styles/screenOptions';
import Custom from '@screens/Custom';
import { UpdateEventRoutes } from '../UpdateEventStackTab';
import { EventProps } from '../event.routes';

const EventManageStackTab = createNativeStackNavigator();

export const EventManageRoutes: React.FC<EventProps> = ({
  route,
  onUpdateEvent,
}) => {
  return (
    <EventManageStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Gerenciar Evento' })}
    >
      <EventManageStackTab.Screen name="EventManageScreen">
        {props => (
          <EventManage {...props} route={route} onUpdateEvent={onUpdateEvent} />
        )}
      </EventManageStackTab.Screen>

      <EventManageStackTab.Screen
        name="UpdateEvent"
        options={{ headerShown: false }}
      >
        {props => (
          <UpdateEventRoutes
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </EventManageStackTab.Screen>

      <EventManageStackTab.Screen name="DeleteEvent" component={Custom} />
    </EventManageStackTab.Navigator>
  );
};
