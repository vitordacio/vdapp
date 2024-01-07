import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import UserAchievements from '@screens/App/User/Top/UserAchievements';
import UserEvents from '@screens/App/User/Top/UserEvents';
import UserParticipations from '@screens/App/User/Top/UserParticipations';
import { screenOptionsTopDefault } from '@styles/screenOptions';
import UserReactsSent from '@screens/App/User/Top/UserReactsSent';

const UserTopTab = createMaterialTopTabNavigator();

export const UserTopTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <UserTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <UserTopTab.Screen
        name="UserEvents"
        options={{
          tabBarLabel: 'Eventos',
        }}
      >
        {props => <UserEvents {...props} route={route} />}
      </UserTopTab.Screen>

      <UserTopTab.Screen
        name="UserParticipations"
        options={{
          tabBarLabel: 'Participações',
        }}
      >
        {props => <UserParticipations {...props} route={route} />}
      </UserTopTab.Screen>

      <UserTopTab.Screen
        name="UserReactsSent"
        options={{
          tabBarLabel: 'Reações Realizadas',
        }}
      >
        {props => <UserReactsSent {...props} route={route} />}
      </UserTopTab.Screen>

      <UserTopTab.Screen
        name="UserAchievements"
        options={{
          tabBarLabel: 'Conquistas',
        }}
      >
        {props => <UserAchievements {...props} route={route} />}
      </UserTopTab.Screen>
    </UserTopTab.Navigator>
  );
};
