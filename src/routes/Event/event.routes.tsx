import { IEvent } from '@interfaces/event';
import { IUser } from '@interfaces/user';
import Event from '@screens/App/Event';
import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Custom from '@screens/Custom';
import { screenOptionsDefault } from '@styles/screenOptions';
import { formatEventName } from '@utils/formaters';
import { EventInviteRoutes } from './EventInviteStackTab';
import { EventManageRoutes } from './EventManageStackTab';
import { EventRequestsTopTabRoutes } from './EventRequestsTopTab';

export type EventProps = NativeStackScreenProps<ParamListBase> & {
  route: { params: { event: IEvent; user?: IUser } };
  onUpdateEvent: (data: IEvent) => void;
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
    <EventStackTab.Navigator screenOptions={() => screenOptionsDefault({})}>
      <EventStackTab.Screen
        name="EventScreen"
        options={{ headerTitle: formatEventName(route.params.event) }}
      >
        {props => (
          <Event {...props} route={route} onUpdateEvent={onUpdateEvent} />
        )}
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

      <EventStackTab.Screen name="EventInbox" component={Custom} />
      <EventStackTab.Screen name="EventLists" component={Custom} />
    </EventStackTab.Navigator>
  );
};
