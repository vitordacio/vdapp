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
} from '@styles/screenOptions';
import { UpdatEventConfirmProps } from '@screens/App/Event/EventManage/Update/UpdateEventConfirm';
import { IEvent } from '@interfaces/event';
import { EventRoutes } from '@routes/App/Event/event.routes';
import { BottomTabRoutes } from '@routes/App/BottomTab/bottomtab.routes';
import { ProfileRoutes } from '@routes/App/Profile/profile.routes';
import { ReactRoutes } from '@routes/App/React/react.routes';

export type AppProps = NativeStackScreenProps<ParamListBase> & {
  route: {
    params: {
      user: IUser;
      onUpdateUser?: (data: IUser) => void;
      updateUserConfirm?: UpdateUserConfirmProps;
      // onUpdateProfile?: (data: IUser) => void;
      event?: IEvent;
      onUpdateEvent?: (data: IEvent) => void;
      updateEventConfirm?: UpdatEventConfirmProps;
      user_profile?: IUser;
      user_friends?: IUser;
      user_reacts_received?: IUser;
      react: {
        type: 'user' | 'event';
        user?: IUser;
        event?: IEvent;
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

      <App.Screen name="ReactsReceived">
        {props => <Custom {...props} route={route} />}
      </App.Screen>

      <App.Screen name="React" options={{ headerShown: false }}>
        {props => <ReactRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen name="Inbox" component={Inbox} />
      <App.Screen name="Map" component={Custom} />

      {/* <App.Screen name="Friends" component={Friends} /> */}
      {/* <App.Screen name="ReactUser" component={Custom} /> */}
    </App.Navigator>
  );
};

export default AppRoutes;
