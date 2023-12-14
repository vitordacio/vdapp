import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Event from '@screens/App/Event';
import Custom from '@screens/Custom';
import { ParamListBase } from '@react-navigation/native';
import { IEvent } from '@interfaces/event';
import ManageEvent from '@screens/App/Event/ManageEvent';
import UpdateEvent from '@screens/App/Event/ManageEvent/Update';
import UpdateEventName from '@screens/App/Event/ManageEvent/Update/UpdateEventName';
import UpdateEventLocation from '@screens/App/Event/ManageEvent/Update/UpdateEventLocation';
import UpdateEventAdditional from '@screens/App/Event/ManageEvent/Update/UpdateEventAdditional';
import UpdateEventClubName from '@screens/App/Event/ManageEvent/Update/UpdateEventClubName';
import UpdateEventDrinkPreferences from '@screens/App/Event/ManageEvent/Update/UpdateEventDrinkPreferences';
import UpdateEventMinAmount from '@screens/App/Event/ManageEvent/Update/UpdateEventMinAmount';
import UpdateEventPerformer from '@screens/App/Event/ManageEvent/Update/UpdateEventPerformer';
import UpdateEventPrivacy from '@screens/App/Event/ManageEvent/Update/UpdateEventPrivacy';
import UpdateEventTicketsFree from '@screens/App/Event/ManageEvent/Update/UpdateEventTicketsFree';
import UpdateEventTicketsValue from '@screens/App/Event/ManageEvent/Update/UpdateEventTicketsValue';

const EventTopTab = createMaterialTopTabNavigator();

export const EventTopTabRoutes: React.FC = () => {
  return (
    <EventTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}
    >
      <EventTopTab.Screen
        name="EventPictures"
        component={Custom}
        options={{
          tabBarLabel: 'Momentos',
        }}
      />
      <EventTopTab.Screen
        name="EventParticipations"
        component={Custom}
        options={{
          tabBarLabel: 'Participando',
        }}
      />
      <EventTopTab.Screen
        name="EventEmojisReceived"
        component={Custom}
        options={{
          tabBarLabel: 'Emotes',
        }}
      />
      <EventTopTab.Screen
        name="EventAchievements"
        component={Custom}
        options={{
          tabBarLabel: 'Conquistas',
        }}
      />
    </EventTopTab.Navigator>
  );
};

const UpdateEventStackTab = createNativeStackNavigator();

export const UpdateEventRoutes = () => {
  return (
    <UpdateEventStackTab.Navigator
      screenOptions={{
        headerTitle: 'Editar Evento',
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
      <UpdateEventStackTab.Screen
        name="UpdateEventScreen"
        component={UpdateEvent}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventName"
        component={UpdateEventName}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventLocation"
        component={UpdateEventLocation}
      />

      <UpdateEventStackTab.Screen name="UpdateEventHours" component={Custom} />
      <UpdateEventStackTab.Screen
        name="UpdateEventPrivacy"
        component={UpdateEventPrivacy}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventAdditional"
        component={UpdateEventAdditional}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventDrinkPreferences"
        component={UpdateEventDrinkPreferences}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventMinAmount"
        component={UpdateEventMinAmount}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventPerformer"
        component={UpdateEventPerformer}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventClubName"
        component={UpdateEventClubName}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventTicketsValue"
        component={UpdateEventTicketsValue}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventTicketsFree"
        component={UpdateEventTicketsFree}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventAddress"
        component={Custom}
      />
    </UpdateEventStackTab.Navigator>
  );
};

const ManageEventStackTab = createNativeStackNavigator();

export const ManageEventRoutes = () => {
  return (
    <ManageEventStackTab.Navigator
      screenOptions={{
        headerTitle: 'Gerenciar Evento',
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
      <ManageEventStackTab.Screen
        name="ManageEventScreen"
        component={ManageEvent}
      />
      <ManageEventStackTab.Screen
        name="UpdateEvent"
        component={UpdateEventRoutes}
        options={{ headerShown: false }}
      />

      <ManageEventStackTab.Screen name="Invite" component={Custom} />
      <ManageEventStackTab.Screen name="DeleteEvent" component={Custom} />
    </ManageEventStackTab.Navigator>
  );
};

const EventStackTab = createNativeStackNavigator();

export const EventRoutes: React.FC<
  NativeStackScreenProps<ParamListBase> & {
    route: { params: { event: IEvent } };
  }
> = ({ route }) => {
  return (
    <EventStackTab.Navigator
      screenOptions={{
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
      <EventStackTab.Screen name="EventScreen">
        {props => <Event {...props} paramEvent={route.params.event} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen
        name="ManageEvent"
        options={{ headerShown: false }}
        component={ManageEventRoutes}
      />

      <EventStackTab.Screen name="EventRequests" component={Custom} />
      <EventStackTab.Screen name="EventInbox" component={Custom} />
      <EventStackTab.Screen name="EventLists" component={Custom} />
    </EventStackTab.Navigator>
  );
};
