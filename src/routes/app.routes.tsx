import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import EmojisReceived from '@screens/App/Emojis';
import Friends from '@screens/App/Friends';
import Custom from '@screens/Custom';
import Inbox from '@screens/App/Inbox';
import Profile from '@screens/App/Profile';
import Notifications from '@screens/App/Notifications';
import Home from '@screens/App/Home';
import User from '@screens/App/User';
import { UpdateUserRoutes } from './user.routes';
import SearchRoutes from './search.routes';
import CreateEventRoutes from './createEvent.routes';
import { EventRoutes } from './Event/event.routes';

const BottomTab = createBottomTabNavigator();

const BottomTabRoutes: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'CreateEvent') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'User') {
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
          // tabBarLabel: 'Início',
          headerTitle: 'Eventos',
        }}
      />

      <BottomTab.Screen
        name="Search"
        component={SearchRoutes}
        options={{
          // tabBarLabel: 'Explorar',
          headerTitle: 'Explorar',
        }}
      />

      <BottomTab.Screen
        name="CreateEvent"
        component={CreateEventRoutes}
        options={{
          // tabBarLabel: 'Criar Evento',
          headerShown: false,
        }}
      />

      <BottomTab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          // tabBarLabel: 'Notificações',
          headerTitle: 'Notificações',
        }}
      />

      <BottomTab.Screen
        name="User"
        component={User}
        options={
          {
            // tabBarLabel: 'Perfil',
          }
        }
      />
    </BottomTab.Navigator>
  );
};

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
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
        options={{ headerShown: false }}
      />
      <App.Screen
        name="Event"
        component={EventRoutes}
        options={{ headerShown: false }}
      />
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="Inbox" component={Inbox} />
      <App.Screen name="Map" component={Custom} />
      <App.Screen
        name="Friends"
        component={Friends}
        options={{
          headerTitle: 'Amigos',
        }}
      />
      <App.Screen
        name="EmojisReceived"
        component={EmojisReceived}
        options={{
          headerTitle: 'Emotes Recebidos',
        }}
      />
      <App.Screen
        name="UpdateUser"
        component={UpdateUserRoutes}
        options={{
          headerShown: false,
        }}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
