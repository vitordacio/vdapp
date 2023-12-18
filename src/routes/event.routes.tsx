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
import { formatEventName } from '@utils/formaters';
import { IUser } from '@interfaces/user';

export type EventProps = NativeStackScreenProps<ParamListBase> & {
  route: { params: { event: IEvent; user?: IUser } };
};

export type EventAndOnUpdateProps = EventProps & {
  onUpdateEvent: (data: IEvent) => void;
};

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

export const EventRequestsTopTabRoutes: React.FC<EventAndOnUpdateProps> = ({
  route,
  onUpdateEvent,
}) => {
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

const EventInviteStackTab = createNativeStackNavigator();

export const EventInviteRoutes: React.FC<EventAndOnUpdateProps> = ({
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

const UpdateEventStackTab = createNativeStackNavigator();

export const UpdateEventRoutes: React.FC<EventAndOnUpdateProps> = ({
  route,
  onUpdateEvent,
}) => {
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
      <UpdateEventStackTab.Screen name="UpdateEventScreen">
        {props => <UpdateEvent {...props} route={route} />}
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

const EventManageStackTab = createNativeStackNavigator();

export const EventManageRoutes: React.FC<EventAndOnUpdateProps> = ({
  route,
  onUpdateEvent,
}) => {
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
      <EventManageStackTab.Screen name="EventManageScreen">
        {props => <EventManage {...props} />}
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

const EventStackTab = createNativeStackNavigator();

export const EventRoutes: React.FC<EventProps> = ({ navigation, route }) => {
  const onUpdateEvent = (data: IEvent) => {
    navigation.setParams({
      ...route.params,
      event: data,
    });
  };

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
      <EventStackTab.Screen
        name="EventScreen"
        options={{ headerTitle: formatEventName(route.params.event) }}
      >
        {props => <Event {...props} navigation={navigation} route={route} />}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventManage" options={{ headerShown: false }}>
        {props => (
          <EventManageRoutes
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventRequests">
        {props => (
          <EventRequestsTopTabRoutes
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </EventStackTab.Screen>

      <EventStackTab.Screen name="EventInvite" options={{ headerShown: false }}>
        {props => (
          <EventInviteRoutes
            {...props}
            route={route}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </EventStackTab.Screen>

      {/* <EventStackTab.Screen
        name="EventInvite"
        options={{ headerShown: false }}
        component={EventInviteRoutes}
      /> */}

      <EventStackTab.Screen name="EventInbox" component={Custom} />
      <EventStackTab.Screen name="EventLists" component={Custom} />
    </EventStackTab.Navigator>
  );
};
