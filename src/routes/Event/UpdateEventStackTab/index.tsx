import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateEvent from '@screens/App/Event/EventManage/Update';
import UpdateEventAdditional from '@screens/App/Event/EventManage/Update/UpdateEventAdditional';
import UpdateEventClubName from '@screens/App/Event/EventManage/Update/UpdateEventClubName';
import UpdateEventDrinkPreferences from '@screens/App/Event/EventManage/Update/UpdateEventDrinkPreferences';
import UpdateEventLocation from '@screens/App/Event/EventManage/Update/UpdateEventLocation';
import UpdateEventMinAmount from '@screens/App/Event/EventManage/Update/UpdateEventMinAmount';
import UpdateEventName from '@screens/App/Event/EventManage/Update/UpdateEventName';
import UpdateEventPerformer from '@screens/App/Event/EventManage/Update/UpdateEventPerformer';
import UpdateEventPrivacy from '@screens/App/Event/EventManage/Update/UpdateEventPrivacy';
import UpdateEventTicketsFree from '@screens/App/Event/EventManage/Update/UpdateEventTicketsFree';
import UpdateEventTicketsValue from '@screens/App/Event/EventManage/Update/UpdateEventTicketsValue';
import Custom from '@screens/Custom';
import { screenOptionsDefault } from '@styles/screenOptions';
import { UpdateEventConfirm } from '@screens/App/Event/EventManage/Update/UpdateEventConfirm';
import { EventProps } from '../event.routes';

const UpdateEventStackTab = createNativeStackNavigator();

export const UpdateEventRoutes: React.FC<EventProps> = ({
  route,
  onUpdateEvent,
}) => {
  return (
    <UpdateEventStackTab.Navigator
      screenOptions={() => screenOptionsDefault({ title: 'Editar Evento' })}
    >
      <UpdateEventStackTab.Screen name="UpdateEventScreen">
        {props => (
          <UpdateEvent {...props} route={route} onUpdateEvent={onUpdateEvent} />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventConfirm">
        {props => (
          <UpdateEventConfirm
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventName">
        {props => (
          <UpdateEventName
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventLocation">
        {props => (
          <UpdateEventLocation
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventPrivacy">
        {props => (
          <UpdateEventPrivacy
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventAdditional">
        {props => (
          <UpdateEventAdditional
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventDrinkPreferences">
        {props => (
          <UpdateEventDrinkPreferences
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventMinAmount">
        {props => (
          <UpdateEventMinAmount
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventPerformer">
        {props => (
          <UpdateEventPerformer
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventClubName">
        {props => (
          <UpdateEventClubName
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventTicketsValue">
        {props => (
          <UpdateEventTicketsValue
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventTicketsFree">
        {props => (
          <UpdateEventTicketsFree
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </UpdateEventStackTab.Screen>

      <UpdateEventStackTab.Screen name="UpdateEventHours" component={Custom} />
      <UpdateEventStackTab.Screen
        name="UpdateEventAddress"
        component={Custom}
      />
    </UpdateEventStackTab.Navigator>
  );
};
