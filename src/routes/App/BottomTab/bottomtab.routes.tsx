import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProps } from '@routes/App/app.routes';
import Notifications from '@screens/App/Notifications';
import Home from '@screens/App/Home';
import colors from '@styles/colors';
import { Icon } from '@components/Icon';
import { UserRoutes } from './User/user.routes';
import SearchRoutes from './Search/search.routes';
import CreateEventRoutes from './CreteEvent/createEvent.routes';

const BottomTab = createBottomTabNavigator();

export const BottomTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route: current }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string;
          if (current.name === 'Home') {
            iconName = focused ? 'home' : 'home_outline';
          } else if (current.name === 'Search') {
            iconName = focused ? 'search' : 'search_outline';
          } else if (current.name === 'CreateEvent') {
            iconName = focused ? 'add_circle' : 'add_circle_outline';
          } else if (current.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications_outline';
          } else if (current.name === 'User') {
            iconName = focused ? 'person' : 'person_outline';
          }

          return <Icon name={iconName} size={size} tintColor={color} />;
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

      <BottomTab.Screen name="CreateEvent" options={{ headerShown: false }}>
        {props => <CreateEventRoutes {...props} route={route} />}
      </BottomTab.Screen>

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
