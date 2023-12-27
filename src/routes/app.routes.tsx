import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import Friends from '@screens/App/Friends';
import Custom from '@screens/Custom';
import Inbox from '@screens/App/Inbox';
import { IUser } from '@interfaces/user';
import { ParamListBase } from '@react-navigation/native';
import Notifications from '@screens/App/Notifications';
import Home from '@screens/App/Home';
import { UpdateUserConfirmProps } from '@screens/App/User/Update/UpdateUserConfirm';
import { screenOptionsDefault } from '@styles/screenOptions';
import { UpdatEventConfirmProps } from '@screens/App/Event/EventManage/Update/UpdateEventConfirm';
import { IEvent } from '@interfaces/event';
import SearchRoutes from './search.routes';
import CreateEventRoutes from './createEvent.routes';
import { EventRoutes } from './Event/event.routes';
import { UserRoutes } from './User/user.routes';
import { ProfileRoutes } from './Profile/profile.routes';
import { ReactRoutes } from './React/react.routes';

export type AppProps = NativeStackScreenProps<ParamListBase> & {
  route: {
    params: {
      user: IUser;
      onUpdateUser?: (data: IUser) => void;
      updateUserConfirm?: UpdateUserConfirmProps;
      profile?: IUser;
      onUpdateProfile?: (data: IUser) => void;
      event?: IEvent;
      onUpdateEvent?: (data: IEvent) => void;
      updateEventConfirm?: UpdatEventConfirmProps;
    };
  };
};

const BottomTab = createBottomTabNavigator();

const BottomTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route: current }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string;
          if (current.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (current.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (current.name === 'CreateEvent') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (current.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (current.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons name={iconName as 'key'} size={size} color={color} />
          );
        },
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor: `${colors.BLACK}`,
        tabBarActiveBackgroundColor: `${colors.BLACK}`,
        tabBarActiveTintColor: `${colors.GOLD}`,
        tabBarInactiveTintColor: `${colors.TEXT_DEFAULT}`,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      })}
    >
      <BottomTab.Screen name="Home" options={{ headerTitle: 'Eventos' }}>
        {props => <Home {...props} route={route} />}
      </BottomTab.Screen>

      <BottomTab.Screen name="Search" options={{ headerTitle: 'Explorar' }}>
        {props => <SearchRoutes {...props} route={route} />}
      </BottomTab.Screen>

      <BottomTab.Screen
        name="CreateEvent"
        component={CreateEventRoutes}
        options={{
          headerShown: false,
        }}
      />

      <BottomTab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerTitle: 'Notificações',
        }}
      />

      <BottomTab.Screen name="User" options={{ headerShown: false }}>
        {props => <UserRoutes {...props} route={route} />}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
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

      <App.Screen name="React" options={{ headerShown: false }}>
        {props => <ReactRoutes {...props} route={route} />}
      </App.Screen>

      <App.Screen name="Inbox" component={Inbox} />
      <App.Screen name="Map" component={Custom} />

      <App.Screen name="Friends" component={Friends} />
      <App.Screen name="ReactUser" component={Custom} />
    </App.Navigator>
  );
};

export default AppRoutes;
