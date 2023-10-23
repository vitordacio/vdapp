import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons } from '@expo/vector-icons';
import Event from '@screens/Event';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OwnProfile from '@screens/Profile/OwnProfile';
// import HomeRoutes from './home.routes';

const BottomTab = createBottomTabNavigator();

const BottomTabRoutes: React.FC = () => {
  return (
    <BottomTab.Navigator
      // initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string;
          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications' : 'notification-outline';
          }

          return (
            <Ionicons name={iconName as 'key'} size={size} color={color} />
          );
        },
        tabBarInactiveBackgroundColor: 'black',
        tabBarActiveBackgroundColor: 'black',
        tabBarActiveTintColor: 'yellow',
        tabBarInactiveTintColor: 'white',
        // tabBarActiveTintColor: `${colors.GOLD}`,
        // tabBarInactiveTintColor: `${colors.WHITE}`,
      })}
    >
      {/* <BottomTab.Screen
        name="Home"
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: 'Início',
        }}
      /> */}

      <BottomTab.Screen
        name="Profile"
        component={OwnProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarLabel: 'Perfil',
          headerShown: false,
        }}
      />
      {/* <BottomTab.Screen
        name="Profile"
        component={OwnProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          tabBarLabel: 'Perfil',
          headerShown: false,
        }}
      /> */}
    </BottomTab.Navigator>
  );
};

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator>
      <App.Screen
        name="BottomTabRoutes"
        component={BottomTabRoutes}
        options={{ headerShown: false }}
      />
      <App.Screen name="Event" component={Event} />
    </App.Navigator>
  );
};

export default AppRoutes;
