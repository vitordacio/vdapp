import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppProps } from '@routes/App/app.routes';
import ProfileAchievements from '@screens/App/Profile/Top/ProfileAchievements';
import ProfileEvents from '@screens/App/Profile/Top/ProfileEvents';
import ProfileParticipations from '@screens/App/Profile/Top/ProfileParticipations';
import { screenOptionsTopDefault } from '@styles/screenOptions';
import ProfileReactsSent from '@screens/App/Profile/Top/ProfileReactsSent';
import { Icon } from '@components/Icon';

const ProfileTopTab = createMaterialTopTabNavigator();

export const ProfileTopTabRoutes: React.FC<AppProps> = ({ route }) => {
  return (
    <ProfileTopTab.Navigator screenOptions={() => screenOptionsTopDefault({})}>
      <ProfileTopTab.Screen
        name="ProfileEvents"
        options={{
          tabBarLabel: () => {
            return <Icon name="party" />;
          },
        }}
      >
        {props => <ProfileEvents {...props} route={route} />}
      </ProfileTopTab.Screen>

      <ProfileTopTab.Screen
        name="ProfileParticipations"
        options={{
          tabBarLabel: () => {
            return <Icon name="users" />;
          },
        }}
      >
        {props => <ProfileParticipations {...props} route={route} />}
      </ProfileTopTab.Screen>

      <ProfileTopTab.Screen
        name="ProfileReactsSent"
        options={{
          tabBarLabel: () => {
            return <Icon name="smile" />;
          },
        }}
      >
        {props => <ProfileReactsSent {...props} route={route} />}
      </ProfileTopTab.Screen>

      <ProfileTopTab.Screen
        name="ProfileAchievements"
        options={{
          tabBarLabel: () => {
            return <Icon name="achievement" />;
          },
        }}
      >
        {props => <ProfileAchievements {...props} route={route} />}
      </ProfileTopTab.Screen>
    </ProfileTopTab.Navigator>
  );
};
