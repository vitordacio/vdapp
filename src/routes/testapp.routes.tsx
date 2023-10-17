import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/Home';
import Profile from '@screens/Profile';

const App = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveBackgroundColor: 'red',
        tabBarActiveTintColor: 'yellow',
      }}
    >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  );
};

export default AppRoutes;
