import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import ProfileAchievements from '@screens/App/Profile/Top/ProfileAchievements';
import ProfileEvents from '@screens/App/Profile/Top/ProfileEvents';
import ProfileParticipations from '@screens/App/Profile/Top/ProfileParticipations';
import { screenOptionsTopDefault } from '@styles/screenOptions';
import ProfileReactsSent from '@screens/App/Profile/Top/ProfileReactsSent';

const ProfileTopTab = createMaterialTopTabNavigator();

export const ProfileTopTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <ProfileTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <ProfileTopTab.Screen
        name="ProfileEvents"
        options={{
          tabBarLabel: 'Eventos',
        }}
      >
        {props => <ProfileEvents {...props} route={route} />}
      </ProfileTopTab.Screen>

      <ProfileTopTab.Screen
        name="ProfileParticipations"
        options={{
          tabBarLabel: 'Participações',
        }}
      >
        {props => <ProfileParticipations {...props} route={route} />}
      </ProfileTopTab.Screen>

      <ProfileTopTab.Screen
        name="ProfileReactsSent"
        options={{
          tabBarLabel: 'Reações',
        }}
      >
        {props => <ProfileReactsSent {...props} route={route} />}
      </ProfileTopTab.Screen>

      <ProfileTopTab.Screen
        name="ProfileAchievements"
        options={{
          tabBarLabel: 'Conquistas',
        }}
      >
        {props => <ProfileAchievements {...props} route={route} />}
      </ProfileTopTab.Screen>
    </ProfileTopTab.Navigator>
  );
};
