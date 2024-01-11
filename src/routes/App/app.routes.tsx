import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Friends from '@screens/App/Friends';
import Custom from '@screens/Custom';
import Inbox from '@screens/App/Inbox';
import { IUser } from '@interfaces/user';
import { ParamListBase } from '@react-navigation/native';
import { UpdateUserConfirmProps } from '@screens/App/User/Update/UpdateUserConfirm';
import {
  screenOptionsDefault,
  screenOptionsFriendsTitle,
  screenOptionsReactsReceivedTitle,
} from '@styles/screenOptions';
import { UpdatEventConfirmProps } from '@screens/App/Event/EventManage/Update/UpdateEventConfirm';
import { IEvent } from '@interfaces/event';
import { EventRoutes } from '@routes/App/Event/event.routes';
import { BottomTabRoutes } from '@routes/App/BottomTab/bottomtab.routes';
import { ProfileRoutes } from '@routes/App/Profile/profile.routes';
import { ReactRoutes } from '@routes/App/React/react.routes';
import { IEmoji } from '@interfaces/emoji';
import { IReact } from '@interfaces/react';
import ReactsReceived from '@screens/App/ReactsReceived';
import { ReactUserViewRoutes } from './React/ReactUserViewRoutes';

export type AppProps = NativeStackScreenProps<ParamListBase> & {
  route: {
    params: {
      user: IUser;
      onUpdateUser?: (data: IUser) => void;
      updateUserConfirm?: UpdateUserConfirmProps;
      event?: IEvent;
      onUpdateEvent?: (data: IEvent) => void;
      updateEventConfirm?: UpdatEventConfirmProps;
      user_profile?: IUser;
      user_invite?: IUser;
      user_friends?: IUser;
      user_reacts_received?: IUser;
      react: {
        type: 'user' | 'event';
        user?: IUser;
        event?: IEvent;
        emoji?: IEmoji;
        react?: IReact;
      };
    };
  };
};

const App = createNativeStackNavigator();

const AppRoutes: React.FC<AppProps> = ({ navigation, route }) => {
  const onUpdateUser = (data: IUser) => {
    navigation.setParams({
      ...route.params,
      user: { ...route.params.user, ...data },
    });
  };
  route.params.onUpdateUser = onUpdateUser;

  const onUpdateEvent = (data: IEvent) => {
    navigation.setParams({
      ...route.params,
      event: { ...route.params.event, ...data },
    });
  };
  route.params.onUpdateEvent = onUpdateEvent;

  return (
    <App.Navigator
      screenOptions={() => screenOptionsDefault({})}
      initialRouteName="BottomTabRoutes"
    >
      <App.Screen name="BottomTabRoutes" options={{ headerShown: false }}>
        {props => <BottomTabRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen name="Event" options={{ headerShown: false }}>
        {props => <EventRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen name="Profile" options={{ headerShown: false }}>
        {props => <ProfileRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen name="CreateReact" options={{ headerShown: false }}>
        {props => <ReactRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen
        name="Friends"
        options={{
          headerTitle: screenOptionsFriendsTitle({
            user: route.params.user,
            user_friends: route.params.user_friends,
          }),
        }}
      >
        {props => <Friends {...props} route={route} />}
      </App.Screen>

      <App.Screen
        name="ReactsReceived"
        options={{
          headerTitle: screenOptionsReactsReceivedTitle({
            user: route.params.user,
            user_reacts_received: route.params.user_reacts_received,
          }),
        }}
      >
        {props => <ReactsReceived {...props} route={route} />}
      </App.Screen>

      <App.Screen name="React" options={{ headerShown: false }}>
        {props => <ReactRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen name="ReactUserView" options={{ headerShown: false }}>
        {props => <ReactUserViewRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen name="Inbox" component={Inbox} />
      <App.Screen name="Map" component={Custom} />
    </App.Navigator>
  );
};

export default AppRoutes;
