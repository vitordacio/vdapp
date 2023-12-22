import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import EmojisReceived from '@screens/App/Emojis';
import Friends from '@screens/App/Friends';
import Custom from '@screens/Custom';
import Inbox from '@screens/App/Inbox';
import { IUser } from '@interfaces/user';
import { ParamListBase } from '@react-navigation/native';
import Notifications from '@screens/App/Notifications';
import Home from '@screens/App/Home';
import SearchRoutes from './search.routes';
import CreateEventRoutes from './createEvent.routes';
import { EventRoutes } from './Event/event.routes';
import { UserRoutes } from './User/user.routes';
import { ProfileRoutes } from './Profile/profile.routes';

export type AppProps = NativeStackScreenProps<ParamListBase> & {
  route: { params: { user: IUser; onUpdateUser: (data: IUser) => void } };
};

const BottomTab = createBottomTabNavigator();

const BottomTabRoutes: React.FC<AppProps> = ({ route }) => {
  const { user, onUpdateUser } = route.params;
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
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Eventos',
        }}
      />

      <BottomTab.Screen
        name="Search"
        component={SearchRoutes}
        options={{
          headerTitle: 'Explorar',
        }}
      />

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

      <BottomTab.Screen
        name="User"
        component={UserRoutes}
        initialParams={{ user, onUpdateUser }}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};

const App = createNativeStackNavigator();

const AppRoutes: React.FC<
  NativeStackScreenProps<ParamListBase> & {
    route: { params: { user: IUser } };
  }
> = ({ navigation, route }) => {
  const onUpdateUser = (data: IUser) => {
    navigation.setParams({
      ...route.params,
      user: data,
    });
  };

  const { user } = route.params;

  return (
    <App.Navigator
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
      <App.Screen
        name="BottomTabRoutes"
        component={BottomTabRoutes}
        initialParams={{ user, onUpdateUser }}
        options={{ headerShown: false }}
      />

      <App.Screen
        name="Event"
        component={EventRoutes}
        options={{ headerShown: false }}
      />

      <App.Screen
        name="Profile"
        component={ProfileRoutes}
        options={{ headerShown: false }}
        initialParams={{ onUpdateUser }}
      />

      <App.Screen name="Inbox" component={Inbox} />
      <App.Screen name="Map" component={Custom} />

      <App.Screen name="Friends" component={Friends} />
      <App.Screen name="EmojisReceived" component={EmojisReceived} />
    </App.Navigator>
  );
};

export default AppRoutes;
