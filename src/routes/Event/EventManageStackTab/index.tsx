import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventManage from '@screens/App/Event/EventManage';
import { screenOptionsDefault } from '@styles/screenOptions';
import DeleteEvent from '@screens/App/Event/EventManage/Delete';
import FinishEvent from '@screens/App/Event/EventManage/Finish';
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

      <EventManageStackTab.Screen
        name="FinishEvent"
        options={{ headerTitle: 'Finalizar Evento' }}
      >
        {props => (
          <FinishEvent {...props} route={route} onUpdateEvent={onUpdateEvent} />
        )}
      </EventManageStackTab.Screen>

      <EventManageStackTab.Screen
        name="DeleteEvent"
        options={{ headerTitle: 'Excluir Evento' }}
      >
        {props => (
          <DeleteEvent {...props} route={route} onUpdateEvent={onUpdateEvent} />
        )}
      </EventManageStackTab.Screen>

      {/* <EventManageStackTab.Screen name="DeleteEvent" component={Custom} /> */}
    </EventManageStackTab.Navigator>
  );
};
