import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import Event from '@screens/App/Event';
import EmojisReceived from '@screens/App/Emojis';
import Friends from '@screens/App/Friends';
import Inbox from '@screens/App/Inbox';
import Profile from '@screens/App/Profile';
import User from '@screens/App/User';
import HomeRoutes from './home.routes';
import { UpdateUserRoutes } from './user.routes';

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
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'CreateEvent') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications' : 'notification-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons name={iconName as 'key'} size={size} color={color} />
          );
        },
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
        headerShown: false,
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeRoutes}
        options={{
          tabBarLabel: 'Início',
        }}
      />

      <BottomTab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'Perfil',
          headerShown: true,
        }}
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
        component={Event}
        options={{
          headerShown: false,
        }}
      />
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="Inbox" component={Inbox} />
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
