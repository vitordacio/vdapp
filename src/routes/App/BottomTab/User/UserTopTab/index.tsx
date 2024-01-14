import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import UserAchievements from '@screens/App/User/Top/UserAchievements';
import UserEvents from '@screens/App/User/Top/UserEvents';
import UserParticipations from '@screens/App/User/Top/UserParticipations';
import { screenOptionsTopDefault } from '@styles/screenOptions';
import UserReactsSent from '@screens/App/User/Top/UserReactsSent';
import { Icon } from '@components/Icon';

const UserTopTab = createMaterialTopTabNavigator();

export const UserTopTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <UserTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <UserTopTab.Screen
        name="UserEvents"
        options={{
          tabBarLabel: () => {
            return <Icon name="party" />;
          },
        }}
      >
        {props => <UserEvents {...props} route={route} />}
      </UserTopTab.Screen>

      <UserTopTab.Screen
        name="UserParticipations"
        options={{
          tabBarLabel: () => {
            return <Icon name="users" />;
          },
        }}
      >
        {props => <UserParticipations {...props} route={route} />}
      </UserTopTab.Screen>

      <UserTopTab.Screen
        name="UserReactsSent"
        options={{
          tabBarLabel: () => {
            return <Icon name="smile" />;
          },
        }}
      >
        {props => <UserReactsSent {...props} route={route} />}
      </UserTopTab.Screen>

      <UserTopTab.Screen
        name="UserAchievements"
        options={{
          tabBarLabel: () => {
            return <Icon name="achievement" />;
          },
        }}
      >
        {props => <UserAchievements {...props} route={route} />}
      </UserTopTab.Screen>
    </UserTopTab.Navigator>
  );
};
