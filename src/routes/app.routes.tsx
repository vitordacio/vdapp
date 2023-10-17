import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '@screens/Home';
import Profile from '@screens/Profile';
import Event from '@screens/Event';
import colors from '@styles/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const TopRoutes: React.FC = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: `${colors.GOLD}`,
        },
      }}
    >
      <TopTab.Screen name="main" component={Home} />
      <TopTab.Screen name="Latest" component={Profile} />
    </TopTab.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
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
        tabBarActiveTintColor: `${colors.GOLD}`,
        tabBarInactiveTintColor: `${colors.WHITE}`,
      })}
    >
      <BottomTab.Screen name="Home" component={TopRoutes} />
      <BottomTab.Screen name="Profile" component={Profile} />
      {/* <BottomTab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{ headerShown: false }}
      /> */}
    </BottomTab.Navigator>
  );
};

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator>
      <App.Screen name="TabRoutes" component={TabRoutes} />
      <App.Screen name="Event" component={Event} />
    </App.Navigator>
  );
};

export default AppRoutes;
