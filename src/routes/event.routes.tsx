import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Event from '@screens/App/Event';
import Custom from '@screens/Custom';
import { ParamListBase } from '@react-navigation/native';
import { IEvent } from '@interfaces/event';
import EventManage from '@screens/App/Event/EventManage';
import UpdateEvent from '@screens/App/Event/EventManage/Update';
import UpdateEventName from '@screens/App/Event/EventManage/Update/UpdateEventName';
import UpdateEventLocation from '@screens/App/Event/EventManage/Update/UpdateEventLocation';
import UpdateEventAdditional from '@screens/App/Event/EventManage/Update/UpdateEventAdditional';
import UpdateEventClubName from '@screens/App/Event/EventManage/Update/UpdateEventClubName';
import UpdateEventDrinkPreferences from '@screens/App/Event/EventManage/Update/UpdateEventDrinkPreferences';
import UpdateEventMinAmount from '@screens/App/Event/EventManage/Update/UpdateEventMinAmount';
import UpdateEventPerformer from '@screens/App/Event/EventManage/Update/UpdateEventPerformer';
import UpdateEventPrivacy from '@screens/App/Event/EventManage/Update/UpdateEventPrivacy';
import UpdateEventTicketsFree from '@screens/App/Event/EventManage/Update/UpdateEventTicketsFree';
import UpdateEventTicketsValue from '@screens/App/Event/EventManage/Update/UpdateEventTicketsValue';
import EventInvite from '@screens/App/Event/EventInvite';
import EventInviteConfirm from '@screens/App/Event/EventInvite/EventInviteConfirm';
import EventRequestsPending from '@screens/App/Event/EventRequests/Pending';
import EventRequestsReviwed from '@screens/App/Event/EventRequests/Reviwed';

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

const EventRequestsTopTab = createMaterialTopTabNavigator();

export const EventRequestsTopTabRoutes: React.FC = () => {
  return (
    <EventRequestsTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIndicatorStyle: { backgroundColor: 'yellow' },
      }}
    >
      <EventRequestsTopTab.Screen
        name="EventRequestsPending"
        component={EventRequestsPending}
        options={{
          tabBarLabel: 'Pendentes',
        }}
      />
      <EventRequestsTopTab.Screen
        name="EventRequestsReviwed"
        component={EventRequestsReviwed}
        options={{
          tabBarLabel: 'Revisados',
        }}
      />
    </EventRequestsTopTab.Navigator>
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

const EventManageStackTab = createNativeStackNavigator();

export const EventManageRoutes = () => {
  return (
    <EventManageStackTab.Navigator
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
      <EventManageStackTab.Screen
        name="EventManageScreen"
        component={EventManage}
      />
      <EventManageStackTab.Screen
        name="UpdateEvent"
        component={UpdateEventRoutes}
        options={{ headerShown: false }}
      />

      <EventManageStackTab.Screen name="DeleteEvent" component={Custom} />
    </EventManageStackTab.Navigator>
  );
};

const EventInviteStackTab = createNativeStackNavigator();

export const EventInviteRoutes = () => {
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
      <EventInviteStackTab.Screen
        name="EventInviteScreen"
        component={EventInvite}
      />
      <EventInviteStackTab.Screen
        name="EventInviteConfirm"
        component={EventInviteConfirm}
      />
    </EventInviteStackTab.Navigator>
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
        name="EventManage"
        options={{ headerShown: false }}
        component={EventManageRoutes}
      />

      <EventStackTab.Screen
        name="EventRequests"
        options={{ headerTitle: 'Solicitações' }}
        component={EventRequestsTopTabRoutes}
      />

      <EventStackTab.Screen
        name="EventInvite"
        options={{ headerShown: false }}
        component={EventInviteRoutes}
      />

      <EventStackTab.Screen name="EventInbox" component={Custom} />
      <EventStackTab.Screen name="EventLists" component={Custom} />
    </EventStackTab.Navigator>
  );
};
