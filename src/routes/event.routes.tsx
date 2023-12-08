import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Event from '@screens/App/Event';
import Custom from '@screens/Custom';
import { ParamListBase } from '@react-navigation/native';
import { IEvent } from '@interfaces/event';

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
          tabBarLabel: 'Fotos',
        }}
      />
      <EventTopTab.Screen
        name="EventParticipations"
        component={Custom}
        options={{
          tabBarLabel: 'Participações',
        }}
      />
      <EventTopTab.Screen
        name="EventEmojisReceived"
        component={Custom}
        options={{
          tabBarLabel: '😊',
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

export const UpdateEventRoutes: React.FC = () => {
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
      <UpdateEventStackTab.Screen name="UpdateEventScreen" component={Custom} />
      <UpdateEventStackTab.Screen name="UpdateEventName" component={Custom} />
      <UpdateEventStackTab.Screen
        name="UpdateEventLocation"
        component={Custom}
      />
      <UpdateEventStackTab.Screen name="UpdateEventHours" component={Custom} />
      <UpdateEventStackTab.Screen
        name="UpdateEventPrivate"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventAdditional"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventDrinkPreferences"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventMinAmount"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventPerformer"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventClubName"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventTicketsValue"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventTicketsFree"
        component={Custom}
      />
      <UpdateEventStackTab.Screen
        name="UpdateEventAddress"
        component={Custom}
      />
    </UpdateEventStackTab.Navigator>
  );
};

const ManageEventStackTab = createNativeStackNavigator();

export const ManageEventRoutes: React.FC = () => {
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
      <ManageEventStackTab.Screen name="ManageEventScreen" component={Custom} />
      <ManageEventStackTab.Screen
        name="UpdateEvent"
        component={UpdateEventRoutes}
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

      <EventStackTab.Screen name="ManageEvent" component={ManageEventRoutes} />
      <EventStackTab.Screen name="EventRequests" component={Custom} />
      <EventStackTab.Screen name="EventInbox" component={Custom} />
      <EventStackTab.Screen name="EventMap" component={Custom} />
      <EventStackTab.Screen name="EventLists" component={Custom} />
    </EventStackTab.Navigator>
  );
};
